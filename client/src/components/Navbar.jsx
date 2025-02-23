import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="logo">
          {/* <img src="" alt="logo" /> */}
          SummarizeTube
        </div>
        <div className="links">
          <li><a href="#">HOME</a></li>
          <li><a href="#">BOOKMARKS</a></li>
          <li><a href="#">ABOUT</a></li>
        </div>
        <span className="signup">
          <button className="signup-btn">
          SIGN UP
          </button>
        </span>
      </div>
    </div>
  )
}

export default Navbar