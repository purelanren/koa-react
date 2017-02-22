'use strict'

const fs = require('fs');
const path = require('path');
const koa = require('koa');
const serve = require('koa-static');
const compress = require('koa-compress');
const config = require('../config')
const routes = require('../src/routes').routes


const web = koa();
const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), {
  encoding: 'utf-8'
});

web.use(compress());

web.use(function* asset(next) {
  if (!/^\/(css|img|js)\/.*$/.test(this.path)) {
    this.body = html;
  } else {
    yield next;
  }
});

if (process.env.NODE_ENV === 'test') {
  web.use(serve(path.resolve(__dirname, '../dist')));
}

app.use(function *() {
  let beforeRender = () => {}
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

      const initialSate = `<script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}</script>`

      let template = html.replace('@reactString', reactString)
      template = template.replace('<script type="text/html"></script>', initialSate)
      this.type = 'text/html'
      this.body = template
    }).catch(err => {
      console.error(err)
    })
  })

  yield beforeRender


web.listen(config.web.port);

console.log(`web server listening on port ${config.web.port}`);
