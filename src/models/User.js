const mongoose = require('mongoose');
const { schemaOptions } = require('../config');

const { Schema } = mongoose;

// Schema

const schema = new Schema(
  {
    email: { type: String, required: [true, 'email 不能为空'] },
    name: { type: String, required: [true, 'username 不能为空'] },
    password: { type: String, required: [true, 'password 不能为空'] },
  },
  {
    ...schemaOptions,
  },
);

schema.index({ email: 1 }, { unique: true });

// Model
const users = mongoose.model('User', schema);

module.exports = users;
