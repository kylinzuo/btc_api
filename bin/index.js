const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const router = require('../src/router.js');
const logUtil = require('../config/log_config.js');

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next()
    logUtil.logRes(ctx)
  } catch (error) {
    logUtil.logError(ctx, error)
  }
})
app.use(router());

app.on('error', err => {
  console.log('server error', err)
});

app.listen(3000);
console.log('Server is running at http://127.0.0.1:3000/');