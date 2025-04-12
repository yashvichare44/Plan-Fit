import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = ""
genai.configure(api_key=GEMINI_API_KEY)

SYSTEM_PROMPT = """
Provide extremely concise answers. Maximum 2 lines. 
Focus on key information. No detailed explanations.
"""

NAVIGATION_ROUTES = {
    "go to community": "/community",
    "go to schemes": "/schemes", 
    "go to setup": "/business-setup",
    "go to insights": "/business-insights",
    "go to financial": "/financial-plan",
    "go to pricing": "/pay"
}

def get_gemini_response(user_input):
    for key, route in NAVIGATION_ROUTES.items():
        if key in user_input.lower():
            return {"reply": f"Navigating to {route}", "route": route}
    
    try:
        model = genai.GenerativeModel("gemini-1.5-pro-latest")
        chat_session = model.start_chat(
            history=[{'role': 'user', 'parts': [SYSTEM_PROMPT]}]
        )
        
        response = chat_session.send_message(user_input)
        cleaned_response = response.text.replace('*', '').strip()
        
        # Ensure response is max 2 lines
        lines = cleaned_response.split('\n')
        cleaned_response = '\n'.join(lines[:2])
        
        return {"reply": cleaned_response}
    
    except Exception as e:
        print(f"Error generating response: {e}")
        return {"reply": "Unable to process request."}

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get("message")
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    
    bot_reply = get_gemini_response(user_message)
    return jsonify(bot_reply)

if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")