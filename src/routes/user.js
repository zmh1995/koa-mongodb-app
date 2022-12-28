const router = require('koa-router')();
const UostController = require('../controllers/user-controller');
const PostController = require('../controllers/post-controller');
const auth = require('../middleware/jwt-verify');

router.prefix('/users');
router.use(auth);

router.get('/me', async (ctx) => {
  const userId = ctx.state.user?.id;
  ctx.body = await UostController.getUserById(userId);
});

router.get('/me/posts', async (ctx) => {
  const params = ctx.request.query;
  params.userId = ctx.state.user?.id;
  const { data, total } = await PostController.getPostsByUserId(params);
  ctx.body = data;
  ctx.set('X-Total', total);
});

router.get('/:id', async (ctx) => {
  ctx.body = await UostController.getUserById(ctx.params.id);
});

router.get('/:id/posts', async (ctx) => {
  const params = ctx.request.query;
  params.userId = ctx.params.id;
  const { data, total } = await PostController.getPostsByUserId(params);
  ctx.body = data;
  ctx.set('X-Total', total);
});

module.exports = router;
