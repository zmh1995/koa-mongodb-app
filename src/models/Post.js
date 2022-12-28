const mongoose = require('mongoose');
const { schemaOptions } = require('../config');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// Schema

const schema = new Schema(
  {
    title: { type: String, required: [true, 'title 不能为空'] },
    content: { type: String, required: [true, 'content 不能为空'] },
    creator: { type: ObjectId, required: [true, 'creator 不能为空'], ref: 'User' },
  },
  {
    ...schemaOptions,
  },
);

schema.index({ title: 1 });
schema.index({ creator: 1 });

// Model
const Post = mongoose.model('Post', schema);

module.exports = Post;
