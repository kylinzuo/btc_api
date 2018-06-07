const log4js = require('log4js');
const logUtil = {}

// 日志类别
const logger = log4js.getLogger();
const loggerHttp = log4js.getLogger('http');

log4js.configure({
  appenders: {
    http: { type: 'dateFile', filename: 'logs/access/res', "alwaysIncludePattern": true, pattern: '-yyyy-MM-dd.log' },
    error: { type: 'dateFile', filename: 'logs/errors/err', "alwaysIncludePattern": true, pattern: '-yyyy-MM.log' }
  },
  categories: {
    default: { appenders: ['error'], level: 'error' },
    http: { appenders: ['http'], level: 'info' }
  }
});

//格式化请求日志
const formatReqLog = function (req) {
  let logText = '';
  let method = req.method;

  //访问方法
  logText += "request method: " + method + "\n";

  //请求原始地址
  logText += "request originalUrl:  " + req.originalUrl + "\n";

  //客户端ip
  logText += "request client ip:  " + req.ip + "\n";

  //请求参数
  if (method === 'GET') {
    logText += "request query:  " + JSON.stringify(req.query) + "\n";
  } else {
    logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
  }

  return logText;
}

//格式化响应日志
const formatRes = function (ctx) {
  let logText = '';

  //响应日志开始
  logText += "\n" + "*************** response log start ***************" + "\n";

  //添加请求日志
  logText += formatReqLog(ctx.request);

  //响应状态码
  logText += "response status: " + ctx.status + "\n";

  //响应内容
  logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";

  //响应日志结束
  logText += "*************** response log end ***************" + "\n";

  return logText;
}

//格式化错误日志
const formatError = function (ctx, err) {
  let logText = '';

  //错误信息开始
  logText += "\n" + "*************** error log start ***************" + "\n";

  //添加请求日志
  logText += formatReqLog(ctx.request);

  //错误名称
  logText += "err name: " + err.name + "\n";

  //错误信息
  logText += "err message: " + err.message + "\n";

  //错误详情
  logText += "err stack: " + err.stack + "\n";

  //错误信息结束
  logText += "*************** error log end ***************" + "\n";

  return logText;
}

// 响应日志
logUtil.logRes = function (ctx) {
  return loggerHttp.info(formatRes(ctx))
}

// 错误日志
logUtil.logError = function (ctx, error) {
  return logger.error(formatError(ctx, error))
}

module.exports = logUtil
