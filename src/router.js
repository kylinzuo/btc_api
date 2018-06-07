const fs = require('fs');
const path = require('path');
const router = require('koa-router')();

function addMiddleware(router, middleware) {
  for (let url in middleware) {
    if (url.startsWith('GET ')) {
      let path = url.substring(4);
      router.get(path, middleware[url]);
    } else if (url.startsWith('POST ')) {
      let path = url.substring(5);
      router.post(path, middleware[url]);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

function addRouter(router, router_dir) {
  let routerPath = path.join(__dirname, router_dir);
  let files = fs.readdirSync(routerPath);
  let jsFiles = files.filter(d => {
    return d.endsWith('.js');
  });

  for (let fname of jsFiles) {
    let middleware = require(path.join(routerPath, fname));
    addMiddleware(router, middleware);
  }
}

module.exports = function (dir) {
  let routerDir = dir || 'router'; // 如果不传参数，扫描目录默认为'router'
  addRouter(router, routerDir);
  return router.routes();
};
