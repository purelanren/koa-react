import { combineReducers } from 'redux'
import Immutable from 'immutable'
import { createReducer } from 'redux-action-tools'
import { async } from '../actions'

const mock = createReducer()
  .when(async.ASYNC_MOCK)
  .done((state, action) => Immutable.fromJS({ data: action.payload }))
  .build(Immutable.fromJS({ data: [] }))

export default combineReducers({
  mock
})
