from flask import Flask, request, jsonify
from flask_cors import CORS
from get_details import get_details
from get_transcript import get_transcript
from get_summary import get_summary

app = Flask(__name__)
# enable cors for all routes
CORS(app)

@app.route("/submit-url", methods=['POST'])
def submit_url():
    # fetch the url from the backend
    data = request.get_json()#get json data from frontend
    url = data.get('url')
    if not url:
        return jsonify({"error":"No URL provided"}),400
    print(url)
    
    #extract the video id from the url fetched
    #first split on basis of v=, then using &, as delimiters
    video_id = url.split('v=')[-1].split('&')[0]
    print(video_id)

    #fetch video details by sending video_id
    # the response will be a json object
    # conatining two key, title and description, and channel name
    video_details = get_details(video_id)

    # call the get_transcript function
    transcript = get_transcript(video_id)

    # get the summary
    summary = get_summary(transcript)
    # returning a dictionary in json format
    return jsonify({"msg":"URL received","details":video_details,"transcript":transcript,"summary":summary})
    # return jsonify({"msg":"URL received","url":url,"video_id":video_id,"details":video_details})

@app.route("/message")
def message():
    return {"msg" : "hello","type" : "text"}


@app.route("/handleSummary")
def handleSummary():
    return "<p>summary</p>"

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == "__main__":
    app.run(debug = True)