import google.generativeai as genai
# from flask import Flask, jsonify
GOOGLE_API_KEY="AIzaSyC42ZXEBA8ZG-g09_72GgtCkqpn5aoDg6w"
def get_summary(transcript):
    model = genai.GenerativeModel("gemini-pro")
    genai.configure(api_key="AIzaSyC42ZXEBA8ZG-g09_72GgtCkqpn5aoDg6w")
    response = model.generate_content(f"Summarize this YouTube video transcript:\n\n{transcript}")
    print(response.text)
    # text = response.text.replace("\n", "<br>")
    return response.text