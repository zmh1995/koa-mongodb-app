const mongoose = require('mongoose');
const Assert = require('http-assert');
const {
  BAD_REQUEST,
  NOT_FOUND,
} = require('http-status');
const PostModel = require('../models/Post');

const { ObjectId } = mongoose.Types;

/**
 * Post management.
 */
module.exports = class PostController {
  /**
   * create a Post
   * @param  {Object} post
   * @return {Object}
   */
  static async create(post) {
    const { title, content } = post;
    Assert(title && content, BAD_REQUEST, '请求body的内容无效');
    return PostModel.create({ title, content, creator: post.userId });
  }

  /**
   * query Posts
   * @param {Object} params params
   * @return {Object} Posts
   */
  static async query(params) {
    const { page, count, userId } = params;
    const where = {};

    if (userId) {
      where.creator = userId;
    }

    const limit = parseInt(count, 10) ? parseInt(count, 10) : 10;
    let skip = (parseInt(page, 10) - 1) * limit;
    skip = skip >= 0 ? skip : 0;

    const total = await PostModel.count(where);

    const data = await PostModel.find(where)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    return { data, total };
  }

  /**
   * 根据用户的id 查询 用户的帖子
   * @param {Object} params params
   * @return {Object} Posts
   */
  static async getPostsByUserId(params) {
    const { userId } = params;
    Assert(ObjectId.isValid(userId), BAD_REQUEST, '用户id无效');
    return this.query(params);
  }

  /**
   * 根据id 查询 帖子
   * @param {Object} params params
   * @return {Object} Posts
   */
  static async getPostById(id) {
    Assert(ObjectId.isValid(id), BAD_REQUEST, '帖子id无效');
    const post = await PostModel.findById(id);
    Assert(post, NOT_FOUND, '帖子不存在');
    return post;
  }

  /**
   * update Post
   * @param  {Object}   post
   * @return {Generator}        [description]
   */
  static async update(id, updateInfo) {
    Assert(ObjectId.isValid(id), BAD_REQUEST, '帖子id无效');
    const post = await PostModel.findById(id);
    Assert(post, NOT_FOUND, '帖子不存在');
    const { title, content } = updateInfo;
    return PostModel.findByIdAndUpdate(id, { $set: { title, content } }, { new: true });
  }
};
