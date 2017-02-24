import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import Immutable from 'immutable'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const logger = createLogger({
  stateTransformer: state => Immutable.fromJS(state).toJS()
})

export default function configureStore(initialState = {}) {
  let finalState = initialState
  // 将JSON转为符合预期的Immutable数据结构
  if (initialState) {
    finalState = {}
    Object.keys(initialState).forEach(key => {
      if (key === 'routing') {
        finalState[key] = initialState[key]
      } else {
        const subState = {}
        Object.keys(subState).forEach(subKey => {
          subState[subKey] = Immutable.fromJS(initialState[key][subKey])
        })
        finalState[key] = subState
      }
    })
  }
  const store = createStore(rootReducer, finalState, compose(
    applyMiddleware(thunk, routerMiddleware(browserHistory), logger),
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
