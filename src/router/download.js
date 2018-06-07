const fs = require('fs');
const path = require('path');
let download = async (ctx, next) => {
  ctx.response.type = 'application/octet-stream';
  ctx.response.body = fs.createReadStream(path.join(__dirname, './home.js'))
}

module.exports = {
  'GET /download': download
}
