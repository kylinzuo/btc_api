let hello = async (ctx, next) => {
  ctx.response.body = `<h1>Hello, world!</h1>`;
}

module.exports = {
  'GET /hello': hello
}
