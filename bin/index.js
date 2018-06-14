const fs = require('fs');
const path = require('path');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const staticServe = require('koa-static');
const Koa = require('koa');
const router = require('../src/router.js');
const logUtil = require('../config/log_config.js');
const sequelizeMysql = require('../src/mysql/sequelize.js');

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next()
    logUtil.logRes(ctx)
  } catch (error) {
    logUtil.logError(ctx, error)
  }
})
app.use(bodyParser());
app.use(json());
app.use(staticServe(path.resolve(__dirname, '../static')));
app.use(router());

app.on('error', err => {
  console.log('server error', err)
});

app.listen(3000);
console.log('Server is running at http://127.0.0.1:3000/');