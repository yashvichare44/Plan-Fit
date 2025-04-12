from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision.transforms as transforms
import torchvision.models as models
import pandas as pd
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and nutrition data
model, idx_to_class = None, None
nutrition_df = None

@app.on_event("startup")
async def startup_event():
    global model, idx_to_class, nutrition_df
    # Load model
    model = models.resnet50()
    model.fc = nn.Sequential(
        nn.Dropout(0.4),
        nn.Linear(model.fc.in_features, 101)
    )
    checkpoint = torch.load("food101_model.pth", map_location='cpu')
    model.load_state_dict(checkpoint['model_state_dict'])
    model.eval()
    idx_to_class = checkpoint['idx_to_class']
    
    # Load nutrition data
    nutrition_df = pd.read_csv("nutrition.csv")

def preprocess_image(file_bytes):
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
    return transform(image).unsqueeze(0)

def predict_food(image_tensor):
    with torch.no_grad():
        outputs = model(image_tensor)
        probs = F.softmax(outputs, dim=1)
        top_prob, top_idx = torch.max(probs, 1)
        return idx_to_class[top_idx.item()], top_prob.item()

def get_nutrition(food_name: str, weight: float):
    # Case-insensitive search and closest weight match
    food_df = nutrition_df[nutrition_df['label'].str.lower() == food_name.lower()]
    if not food_df.empty:
        closest = food_df.iloc[(food_df['weight'] - weight).abs().argsort()[:1]]
        row = closest.iloc[0]
        return {
            'food_name': food_name,
            'confidence': 0.95,  # or use actual confidence if available
            'calories': float(row['calories']),
            'protein': float(row['protein']),
            'carbohydrates': float(row['carbohydrates']),
            'fats': float(row['fats']),
            'fiber': float(row['fiber']),
            'sugars': float(row['sugars']),
            'sodium': float(row['sodium'])
        }
    return None

@app.post("/analyze/")
async def analyze(
    image: UploadFile = File(..., description="Food image file"),
    weight: str = Form(..., description="Food weight in grams")
):
    try:
        # Convert weight
        try:
            weight_float = float(weight)
        except ValueError:
            return JSONResponse(
                status_code=400,
                content={"error": "Weight must be a number"}
            )

        # Process image
        image_bytes = await image.read()
        image_tensor = preprocess_image(image_bytes)
        
        # Predict
        food_name, confidence = predict_food(image_tensor)
        
        # Get nutrition
        result = get_nutrition(food_name, weight_float)
        if not result:
            return JSONResponse(
                status_code=404,
                content={"error": f"Nutrition data not found for {food_name}"}
            )

        return result

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )
