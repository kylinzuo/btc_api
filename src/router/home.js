let home = async (ctx, next) => {
  ctx.cookies.set('name', 'tobi', { signed: true });
  ctx.response.body = `<h1>Hello, home!</h1>`;
};

module.exports = {
  'GET /home': home
};