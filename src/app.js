import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store'
import { getRouter } from './routes'

const store = configureStore(window.$INITIAL_STATE)
const history = syncHistoryWithStore(browserHistory, store)
const router = getRouter(history)

render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
)
