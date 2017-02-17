import { combineReducers } from 'redux'
import Immutable from 'immutable'
import hello from '../actions'

function visited(state = Immutable.fromJS({ status: 'no' }), { type }) {
  switch (type) {
    case hello.VISITE_HELLO:
      return Immutable.fromJS({ status: 'yes', time: new Date().toLocaleDateString() })

    default:
      return state
  }
}

export default combineReducers({
  visited
})
