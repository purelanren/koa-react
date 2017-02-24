import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import hello from './hello'
import async from './async'

export default combineReducers({
  routing,
  hello,
  async
})
