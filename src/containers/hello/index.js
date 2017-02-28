import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { hello as helloAction } from '../../actions'
import Time from '../../components/time'

class Hello extends Component {

  componentDidMount() {
    this.props.visiteHello()
  }

  render() {
    return (
      <div>
        <Link to="/">home</Link>
        <p>Welcome</p>
        <Time time={this.props.visited.get('time')} />
      </div>
    )
  }
}

Hello.propTypes = {
  visited: PropTypes.instanceOf(Immutable.Map),
  visiteHello: PropTypes.func
}

const mapStateToProps = state => ({
  visited: state.hello.visited
})

const mapDispatchToProps = dispatch => ({
  visiteHello() {
    dispatch(helloAction.visiteHello())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Hello)
