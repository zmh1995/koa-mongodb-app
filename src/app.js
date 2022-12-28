const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const error = require('koa-json-error');
const cors = require('koa-cors');
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const config = require('./config');
const mongoConf = require('./config/mongo');

const app = new Koa();
const router = new Router();
const { http } = config;
const dir = path.resolve(__dirname, './routes');

router.prefix('/api/v2');

fs.readdirSync(dir).forEach((route) => {
  const api = require(`${dir}/${route}`);
  router.use(api.routes());
});

app
  .use(cors(config.cors))
  .use(bodyParser()) // 解析request的body
  // .use(auth)
  .use(error(config.jsonError))
  .use(router.routes())
  .use(router.allowedMethods());

mongoConf.connect();

app.listen(http.port);
console.log(`app started at port ${http.port}...`);
