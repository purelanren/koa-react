import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import Home from './containers/home'
import Hello from './containers/hello'

export const routes = (
  <Route path="/">
    <IndexRoute component={Home} />
    <Route path="/hello" component={Hello} />
  </Route>
)

export function getRouter(history) {
  return (
    <Router history={history}>
      {routes}
    </Router>
  )
}
