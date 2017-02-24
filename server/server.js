'use strict'

import fs from 'fs'
import path from 'path'
import koa from 'koa'
import serve from 'koa-static'
import compress from 'koa-compress'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'
import config from '../config'
import configureStore from '../src/store/configureStore.server'
import { routes } from '../src/routes'
import { loadOnServer } from '../libs/serverRender'

const web = koa()
let html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), {
  encoding: 'utf-8'
})
const store = configureStore({})

web.use(compress())

web.use(function* isomorphic(next) {
  if (/^\/(css|img|js)\/.*$/.test(this.path)) {
    yield next
  } else {
    let beforeRender
    match({ routes, location: this.originalUrl }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        this.redirect(redirectLocation.pathname + redirectLocation.search, '/')
        return
      }

      if (error) {
        this.throw(error, 500)
      }

      if (!renderProps) {
        this.throw('not found', 404)
      }

      beforeRender = loadOnServer(store.dispatch, renderProps.components).then(() => {
        const reactString = ReactDOM.renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )

        const initialSate = `<script>window.$INITIAL_STATE = ${JSON.stringify(store.getState())}</script>`

        html = html.replace('@reactString', reactString).replace('<script type="text/html"></script>', initialSate)
      }).catch(err => {
        console.error(err)
      })
    })

    yield beforeRender
    this.body = html
  }
})

if (process.env.NODE_ENV === 'test') {
  web.use(serve('./dist'));
}

web.listen(config.web.port)

console.log(`web server listening on port ${config.web.port}`)
