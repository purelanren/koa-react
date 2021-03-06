import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

export default function configureStore(initialState = {}) {
  const finalCreateStore = compose(
    applyMiddleware(thunk, routerMiddleware(browserHistory))
  )(createStore)

  const store = finalCreateStore(rootReducer, initialState)

  return store
}
