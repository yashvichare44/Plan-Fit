from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import google.generativeai as genai
import requests
import json
import re
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only, specify your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],  # Or specify ["POST", "OPTIONS"] if you prefer
    allow_headers=["*"],
)
GOOGLE_API_KEY = ""
YOUTUBE_API_KEY = ""

genai.configure(api_key=GOOGLE_API_KEY)
gemini_model = genai.GenerativeModel("gemini-1.5-pro-latest")

# ==== Pydantic Model ====
class UserInfo(BaseModel):
    age: int
    gender: str
    height_cm: int
    weight_kg: int
    goal: str
    diet: str
    activity_level: str
    workout_preference: str
    allergies: str
    user_suggestion: str

# ==== Prompt Template ====
def generate_prompt(user_info):
    return f"""
You are a certified fitness and nutrition expert.

Create a 7-day {user_info.diet.lower()} meal plan for muscle gain:
- Age: {user_info.age}
- Gender: {user_info.gender}
- Height: {user_info.height_cm} cm
- Weight: {user_info.weight_kg} kg
- Activity: {user_info.activity_level}
- Allergies: {user_info.allergies}

Include this user suggestion: "{user_info.user_suggestion}"

Return a valid JSON only:
{{
  "meal_plan": {{
    "Day 1": {{
      "breakfast": {{
        "main": "...",
        "calories": "...",
        "prep_tip": "..."
      }},
      "lunch": {{
        "main": "...",
        "calories": "...",
        "prep_tip": "..."
      }},
      "dinner": {{
        "main": "...",
        "calories": "...",
        "prep_tip": "..."
      }},
      "snacks": {{
        "main": "...",
        "calories": "...",
        "prep_tip": "..."
      }}
    }},
    ...
  }},
  "alternate_meals": {{
    "breakfast": [
      {{
        "main": "...",
        "calories": "...",
        "prep_tip": "..."
      }},
      ...
    ],
    "lunch": [...],
    "dinner": [...],
    "snacks": [...]
  }}
}}
"""

# ==== Extract JSON from Gemini Response ====
def extract_json(text):
    match = re.search(r'\{[\s\S]*\}', text)
    if match:
        return json.loads(match.group())
    else:
        raise ValueError("Valid JSON not found in Gemini response.")

# ==== YouTube Recipe Video Fetcher ====
def get_youtube_video_link(dish_name):
    search_query = f"{dish_name} recipe"
    url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={search_query}&key={YOUTUBE_API_KEY}&maxResults=1&type=video"
    response = requests.get(url)
    results = response.json()
    if results.get("items"):
        video_id = results["items"][0]["id"]["videoId"]
        return f"https://www.youtube.com/watch?v={video_id}"
    return "No video found"

# ==== FastAPI Endpoint ====
@app.post("/generate_meal_plan")
async def generate_meal_plan(user_info: UserInfo):
    try:
        prompt = generate_prompt(user_info)
        gemini_response = gemini_model.generate_content(prompt)
        plan = extract_json(gemini_response.text)

        # Add video links to main meals
        for day in plan["meal_plan"]:
            for meal_type in plan["meal_plan"][day]:
                dish_name = plan["meal_plan"][day][meal_type]["main"]
                plan["meal_plan"][day][meal_type]["video"] = get_youtube_video_link(dish_name)

        # Add video links to alternate meals
        for meal_type in plan["alternate_meals"]:
            for meal in plan["alternate_meals"][meal_type]:
                meal["video"] = get_youtube_video_link(meal["main"])

        return plan

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))