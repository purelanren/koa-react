import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import Immutable from 'immutable'
import scss from './home.scss'

@cssModules(scss)
class Home extends Component {
  render() {
    return (
      <div styleName="home">
        <Link to="/hello">hello</Link>
        <p>{`hello has been visited? ${this.props.visited.get('status')}`}</p>
      </div>
    )
  }
}

Home.propTypes = {
  visited: PropTypes.instanceOf(Immutable.Map),
}

const mapStateToProps = state => ({
  visited: state.hello.visited
})

export default connect(mapStateToProps)(Home)
