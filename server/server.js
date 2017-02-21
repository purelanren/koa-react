'use strict'

const fs = require('fs');
const path = require('path');
const koa = require('koa');
const serve = require('koa-static');
const compress = require('koa-compress');
const config = require('../config')


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

web.listen(config.web.port);

console.log(`web server listening on port ${config.web.port}`);
