// config/mongo.js
const mongoose = require('mongoose');
const config = require('./index');

module.exports = {
  connect: () => {
    const { db } = config;
    mongoose.connect(db.url, db.opt);
    const mongodb = mongoose.connection;
    mongodb.on('error', console.error.bind(console, '连接错误:'));
    mongodb.once('open', () => {
      console.log('mongodb connect suucess');
    });
  },
};
