import React from 'react'

import profilePic from './profile-pic.jpeg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Dan Abramov`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
        <p style={{ maxWidth: 310 }}>
          Personal blog by <a href="https://github.com/rafael-vitor">Ravi</a>. <br />
          Writing how I'd like to have read it
        </p>
      </div>
    )
  }
}

export default Bio
