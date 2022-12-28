const mongoose = require('mongoose');
const Assert = require('http-assert');
const {
  BAD_REQUEST,
  NOT_FOUND,
} = require('http-status');
const UserModel = require('../models/User');

const { ObjectId } = mongoose.Types;

/**
 * User management.
 */
module.exports = class UserController {
  /**
   * 根据 用户id 查找用户 信息
   * @param id
   * @return {Object}
   */
  static async getUserById(id) {
    Assert(ObjectId.isValid(id), NOT_FOUND, '用户id无效');
    const userInfo = await UserModel.findById(id, {
      _id: 1, email: 1, name: 1, createdAt: 1,
    });
    Assert(userInfo, BAD_REQUEST, '用户不存在');
    return userInfo;
  }
};
