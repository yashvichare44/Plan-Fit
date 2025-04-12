from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import boto3
import requests
import uuid
import subprocess
import os
import time
import re

ASSEMBLYAI_API_KEY = ""
OPENROUTER_API_KEY = ""
AWS_REGION = "us-east-1"
AWS_ACCESS_KEY_ID = ""
AWS_SECRET_ACCESS_KEY = ""
TRIGGER_PHRASE = "hey"

# === INIT FLASK ===
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend calls

# === AWS POLLY CLIENT ===
polly = boto3.client(
    "polly",
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

# === UTILS ===
def transcribe_audio(filename):
    headers = {"authorization": ASSEMBLYAI_API_KEY}
    with open(filename, 'rb') as f:
        upload_response = requests.post("https://api.assemblyai.com/v2/upload", headers=headers, data=f)
    audio_url = upload_response.json()['upload_url']
    print("📤 Uploaded:", audio_url)

    transcript_response = requests.post("https://api.assemblyai.com/v2/transcript",
        json={"audio_url": audio_url}, headers=headers)
    transcript_id = transcript_response.json()['id']

    while True:
        status = requests.get(f"https://api.assemblyai.com/v2/transcript/{transcript_id}", headers=headers).json()
        if status['status'] == 'completed':
            print(f"📝 Transcribed: {status['text']}")
            return status['text']
        elif status['status'] == 'error':
            print("❌ Transcription error:", status)
            return ""
        time.sleep(1)

def speak_with_polly(text):
    try:
        response = polly.synthesize_speech(Text=text, OutputFormat="mp3", VoiceId="Joanna")
        mp3_filename = f"response_{uuid.uuid4()}.mp3"

        with open(mp3_filename, 'wb') as f:
            f.write(response['AudioStream'].read())

        subprocess.run(["afplay", mp3_filename])  # macOS player; use playsound/win32 on Windows
        os.remove(mp3_filename)

    except Exception as e:
        print("❌ Polly error:", e)

def get_bot_reply(prompt, history=[]):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    conversation = [
        {"role": "system", "content": "You are a professional fitness coach. "
                "Keep responses concise (1-2 sentences max). "
                "Focus on providing actionable fitness advice. "
                "Ask relevant follow-up questions to keep the conversation going. "
                "Be motivational but realistic. "
                "Avoid medical advice and disclaimers."}
    ] + history + [{"role": "user", "content": prompt}]

    data = {
        "model": "openai/gpt-3.5-turbo",
        "messages": conversation
    }

    response = requests.post("https://openrouter.ai/api/v1/chat/completions", json=data, headers=headers)
    reply = response.json().get('choices', [{}])[0].get('message', {}).get('content', '')
    return reply, conversation

# === API ENDPOINT ===
@app.route('/voice', methods=['POST'])
def handle_voice():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file received"}), 400

    audio = request.files['audio']
    filename = secure_filename("user_input.wav")
    audio.save(filename)

    try:
        user_input = transcribe_audio(filename).lower()
        if not user_input:
            return jsonify({"error": "Could not transcribe audio"}), 500

        reply, _ = get_bot_reply(user_input)
        speak_with_polly(reply)

        return jsonify({
            "user": user_input,
            "bot": reply
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# === HARDCODED PORT ===
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)