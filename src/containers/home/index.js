import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import Immutable from 'immutable'
import { async } from '../../actions'
import { serverActions } from '../../../libs/serverRender'
import scss from './home.scss'

@serverActions([async.asyncMock])
@cssModules(scss)
class Home extends Component {
  componentDidMount() {
    this.props.asyncMock()
  }

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
  asyncMock: PropTypes.func
}

const mapStateToProps = state => ({
  visited: state.hello.visited
})

const mapDispatchoProps = dispatch => ({
  asyncMock: () => dispatch(async.asyncMock())
})

export default connect(mapStateToProps, mapDispatchoProps)(Home)
