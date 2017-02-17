import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import hello from './hello'

export default combineReducers({
  routing,
  hello
})
