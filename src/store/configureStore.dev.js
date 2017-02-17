import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import Immutable from 'immutable'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const logger = createLogger({
  stateTransformer: (state) => {
    const newState = {}
    for (const i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS()
      } else {
        newState[i] = state[i]
      }
    }
    return newState
  }
})

export default function configureStore(initialState = {}) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(routerMiddleware(browserHistory), logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'))
    })
  }

  return store
}
