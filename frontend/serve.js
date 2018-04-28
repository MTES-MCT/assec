const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const usedebug = require('./app/core/usedebug');

const dev = usedebug();
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  const port = parseInt(process.env.PORT, 10);

  // router.get('/a', async (ctx) => {
  //   await app.render(ctx.req, ctx.res, '/b', ctx.query);
  //   ctx.respond = false;
  // });
  //
  // router.get('/b', async (ctx) => {
  //   await app.render(ctx.req, ctx.res, '/a', ctx.query);
  //   ctx.respond = false;
  // });

  router.get('*', async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(koaConnect(compression()));

  server.use(async (ctx, snext) => {
    ctx.res.statusCode = 200;
    await snext();
  });

  server.use(router.routes());
  server.listen(port, (err) => {
    if (err) throw err;
    if (!dev) return;
    process.stdout.write(`Landingpage running on http://0.0.0.0:${port}`);
  });

  // Do graceful shutdown
  process.on('SIGINT', () => {
    // FIXME -> close DB connections
    server.close(() => process.stdout.write('Closing Landingpage server'));
  });
});
