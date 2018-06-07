let time = async (ctx, next) => {
  ctx.response.body = Math.floor(Date.now() / 1000)
}

module.exports = {
  'GET /time': time
}
