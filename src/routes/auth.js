const router = require('koa-router')();
const AuthController = require('../controllers/auth-controller');

router.prefix('/auth');

router.post('/register', async (ctx) => {
  ctx.body = await AuthController.regist(ctx.request.body);
});

router.post('/login', async (ctx) => {
  ctx.body = await AuthController.login(ctx.request.body);
});

module.exports = router;
