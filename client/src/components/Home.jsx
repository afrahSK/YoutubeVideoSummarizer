import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
const Home = () => {
  const [loading, setLoading] = useState(false); // Define loading state
  const [url, setUrl] = useState("");
  const [details, setDetails] = useState({});
  const [summary,setSummary] = useState("");

  // triggers when button is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    // sends post reuqest to submit-url endpoint, sends url along
    // receives response of object having tt and desc and updates details state
    const response = await fetch('http://127.0.0.1:5000/submit-url', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "url": url })
    });
    const data = await response.json()
    // data is object of object
    setDetails(data["details"])
    setSummary(data["summary"])
    console.log(data)
    setLoading(false);
  }

  const [msg, setMsg] = useState({});
  //Runs automatically once when the component mounts.
  // Sends a GET request (no data sent).
  //   It sends a GET request to /message (Flask backend).
  // The response is stored in msg state.
  // The state is updated, and any UI using msg will re-render.
  useEffect(() => {
    // get request to backend endpoint
    fetch('http://127.0.0.1:5000/message').then(
      // converts response to json format
      res => res.json()//this itself returns another promise, so use then again
    ).then(
      data => {
        setMsg(data)
        console.log(data)
      }
    )
  }, [])
  // .then is used to handle promises,allows to execute function
  // after promise is successfuly resolved
  return (
    <div className='home'>
      <div className="home-txt">
        "Turn Hours into Minutes :<br /> Get Instant Video Summaries!"
      </div>
      <div className="form">
        <div className="left-form">
          <div className="how_works">
            How does it <br /><span className='work'>work</span>?
          </div>
          <div className="step_works">
            1.Paste the url of Youtube Video.
            <br />
            <br />
            2.Click 'Get Summary' Button.
            <br />
            <br />
            3.Read,bookmark or download the Summary!
          </div>
        </div>
        <div className="right-form">
          <form className='form-inp'>
            <label className='lbl' htmlFor="inp">Enter URL</label>
            <input
              type="text"
              placeholder="Paste YouTube URL here..."
              id='inp'
              className="url-input"
              name='url-input'
              value={url}
              onChange={(e) => { setUrl(e.target.value) }}
            />
            <button className="summary-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? "Generating Summary..." : "Get Summary"}
              </button>
          </form>
        </div>
      </div>
      <div className="details-div">
        <div className="details-left">
          <div className="details-left-head">Video Details</div>
          <div className="details-left-details">
            <div className="vid-det-left">
              <p className="ch-name"><span>Channel Name:</span><br/> {details["channelName"]}</p>
              <p className="title"><span>Title:</span> <br/>{details["title"]}</p>
              <p className="date"><span>Date Published:</span><br/> {details["publishedAt"]}</p>
            </div>
          </div>
        </div>
        <div className="details-right">
          <h1 className="summary-head">Video Summary:</h1>
          <p className="summary">
  {summary.split('\n').map((line, index) => {
    // Match headings wrapped in double asterisks (but not bullet points)
    const headingMatch = line.match(/^\*\*(.*?)\*\*$/);

    return (
      <React.Fragment key={index}>
        {headingMatch ? <h3><b>{headingMatch[1]}</b></h3> : line} {/* Bold only headings */}
        <br />
      </React.Fragment>
    );
  })}
</p>
          
        </div>
      </div>
    </div>
  )
}

export default Home