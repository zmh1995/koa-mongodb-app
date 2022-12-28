const router = require('koa-router')();
const PostController = require('../controllers/post-controller');
const auth = require('../middleware/jwt-verify');

router.prefix('/posts');
router.use(auth);

router.get('/', async (ctx) => {
  const { data, total } = await PostController.query(ctx.request.query);
  ctx.body = data;
  ctx.set('X-Total', total);
});

router.get('/:id', async (ctx) => {
  ctx.body = await PostController.getPostById(ctx.params.id);
});

router.post('/', async (ctx) => {
  const { body } = ctx.request;
  body.userId = ctx.state.user?.id;
  ctx.body = await PostController.create(body);
});

router.patch('/:id', async (ctx) => {
  ctx.body = await PostController.update(ctx.params.id, ctx.request.body);
});

module.exports = router;
