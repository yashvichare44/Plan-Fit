from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import requests
import json
import re

# ==== FastAPI App ====
app = FastAPI()

# ==== CORS Middleware ====
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify frontend URL like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==== API Keys ====
GOOGLE_API_KEY = ""
YOUTUBE_API_KEY = ""

genai.configure(api_key=GOOGLE_API_KEY)
gemini_model = genai.GenerativeModel("gemini-1.5-pro-latest")

# ==== Pydantic Input Schema ====
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

# ==== Prompt Builder ====
def build_workout_prompt(user_info: UserInfo) -> str:
    return f"""
You are a certified fitness trainer.

Create a personalized 7-day gym-based workout plan for the user with exactly 3 exercises per day.

User Info:
- Age: {user_info.age}
- Gender: {user_info.gender}
- Height: {user_info.height_cm} cm
- Weight: {user_info.weight_kg} kg
- Fitness Goal: {user_info.goal}
- Activity Level: {user_info.activity_level}
- Diet: {user_info.diet}
- Preferences: {user_info.workout_preference}
- Allergies or Conditions: {user_info.allergies}
- Special Suggestion: "{user_info.user_suggestion}"

Response format (strictly return valid JSON, no extra text):

{{
  "workout_plan": {{
    "Day 1": {{
      "goal": "e.g. Upper Body Strength",
      "focus": "e.g. Push Exercises",
      "exercises": [
        {{
          "name": "Exercise 1",
          "sets": "e.g. 3 sets",
          "reps": "e.g. 10-12 reps",
          "notes": "e.g. Maintain form, rest 60s"
        }},
        {{
          "name": "Exercise 2",
          "sets": "...",
          "reps": "...",
          "notes": "..."
        }},
        {{
          "name": "Exercise 3",
          "sets": "...",
          "reps": "...",
          "notes": "..."
        }}
      ]
    }},
    ...
    "Day 7": {{
      ...
    }}
  }}
}}
"""

# ==== JSON Extractor ====
def extract_json(text: str):
    match = re.search(r'\{[\s\S]*\}', text)
    if match:
        return json.loads(match.group())
    else:
        raise ValueError("Valid JSON not found in Gemini response.")

# ==== YouTube Video Fetcher ====
def get_youtube_video_link(query: str) -> str:
    search_query = f"{query} exercise"
    url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={search_query}&key={YOUTUBE_API_KEY}&maxResults=1&type=video"
    response = requests.get(url)
    results = response.json()
    if results.get("items"):
        video_id = results["items"][0]["id"]["videoId"]
        return f"https://www.youtube.com/watch?v={video_id}"
    return "No video found"

# ==== FastAPI Route ====
@app.post("/generate_workout_plan")
async def generate_workout_plan(user_info: UserInfo):
    try:
        prompt = build_workout_prompt(user_info)
        gemini_response = gemini_model.generate_content(prompt)
        workout_plan = extract_json(gemini_response.text)

        # Add YouTube links
        for day in workout_plan["workout_plan"]:
            for exercise in workout_plan["workout_plan"][day]["exercises"]:
                exercise_name = exercise["name"]
                exercise["video"] = get_youtube_video_link(exercise_name)

        return workout_plan

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))