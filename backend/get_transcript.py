from youtube_transcript_api import YouTubeTranscriptApi
# def get_chunks(transcript):

def get_transcript(video_id):
    transcript = YouTubeTranscriptApi.get_transcript(video_id)
    # to combine all transcript in a single string
    # the respones is a array of objects containing text,start,end time
    text = " ".join(t["text"] for t in transcript)
    # print(text)
    # get_chunks(text)
    return text

