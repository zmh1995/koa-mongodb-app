const jwt = require('jsonwebtoken');
const Assert = require('http-assert');
const {
  UNAUTHORIZED,
} = require('http-status');
const config = require('../config');

const { secret, options } = config.jwt;

// 验证token的中间件
module.exports = async (ctx, next) => {
  const { authsessiontoken = '' } = ctx.request.header;
  try {
    const user = jwt.verify(authsessiontoken, secret, options);
    ctx.state.user = user;
  } catch (error) {
    Assert(false, UNAUTHORIZED, 'JWT无效,JWT空位或者JWT过期了');
  }
  await next();
};
