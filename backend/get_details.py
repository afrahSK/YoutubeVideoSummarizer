# file that has function which fetches the video title and description
# thorugh the video_id from the yt data API
import requests
YT_DATA_API_KEY = "AIzaSyC42ZXEBA8ZG-g09_72GgtCkqpn5aoDg6w"
def get_details(video_id):
    # API request to YouTube's Data API v3
    api_url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet&id={video_id}&key={YT_DATA_API_KEY}"
    # ?part=snippet specifies metadata like video title,desc,channel name,etc
    # we will receive the snippet data in json format
    response = requests.get(api_url)
    data = response.json()
    if "items" in data and data["items"]:
        # data is a json object
        # data["items"] is an array
        # in items array on 0th index there is an object that
        # contains an object called snippet
        snippet = data["items"][0]["snippet"]
        # print(snippet)
        return {"title":snippet["title"],"description":snippet["description"],"channelName":snippet["channelTitle"],"publishedAt":snippet["publishedAt"]}
    else:
        return {"error":"Invalid video id"}