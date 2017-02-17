import React, { Component, PropTypes } from 'react'

class Time extends Component {
  render() {
    return (
      <p>visited: {this.props.time}</p>
    )
  }
}

Time.propTypes = {
  time: PropTypes.string
}

export default Time
