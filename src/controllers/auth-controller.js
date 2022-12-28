const jwt = require('jsonwebtoken');
const Assert = require('http-assert');
const {
  BAD_REQUEST,
} = require('http-status');
const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const config = require('../config');

const { secret, options } = config.jwt;

/**
 * auth management.
 */
module.exports = class AuthController {
  /**
   * 加密
   * @param {String} plainText
   * @return {String}
   */
  static async bcrypt(plainText) {
    const pappered = this.getPepperedText(plainText);
    const salt = bcrypt.genSaltSync(config.bcrypt.rounds);
    return bcrypt.hashSync(pappered, salt);
  }

  /**
   * 解密
   * @param {String} plainText
   * @return {String}
   */
  static async bcryptCompare(plainText, hash) {
    const pappered = this.getPepperedText(plainText);
    return bcrypt.compareSync(pappered, hash);
  }

  /**
   * 加密
   * @param {String} plainText
   * @return {String}
   */
  static getPepperedText(plainText) {
    return `${plainText}${config.bcrypt.pepper}`;
  }

  /**
   * 注册
   * @param {Object} registInfo
   * @return {String}
   */
  static async regist(registInfo) {
    const { name, email, password } = registInfo;
    Assert(name && email && password, BAD_REQUEST, '昵称,用户名和密码还有不能为空');

    const user = await UserModel.findOne({ email });
    Assert(!user, BAD_REQUEST, '邮箱已被注册');

    const encryptedPassword = await this.bcrypt(password);

    const userInfo = await UserModel.create({
      name, email, password: encryptedPassword,
    });

    const data = {
      id: userInfo.id,
      name: userInfo.name,
    };
    const token = jwt.sign(data, secret, options);
    return { token };
  }

  /**
   * 注册
   * @param {Object} loginInfo
   * @return {String}
   */
  static async login(loginInfo) {
    const { email, password } = loginInfo;
    Assert(email && password, BAD_REQUEST, '用户名和密码不能为空');

    const userInfo = await UserModel.findOne({ email });
    Assert(userInfo, BAD_REQUEST, '用户名或密码不正确');

    const isPasswordIncorrect = await this.bcryptCompare(password, userInfo.password);
    Assert(isPasswordIncorrect, BAD_REQUEST, '用户名或密码不正确');

    const data = {
      id: userInfo.id,
      name: userInfo.name,
    };
    const token = jwt.sign(data, secret, options);
    return { token };
  }
};
