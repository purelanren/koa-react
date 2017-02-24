import { combineReducers } from 'redux'
import Immutable from 'immutable'
import { createReducer } from 'redux-action-tools'
import { hello } from '../actions'

const visited = createReducer()
  .when(hello.VISITE_HELLO, () => Immutable.fromJS({ status: 'yes', time: new Date().toLocaleDateString() }))
  .build(Immutable.fromJS({ status: 'no' }))

export default combineReducers({
  visited
})
