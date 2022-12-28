const dotenv = require('dotenv');
const path = require('path');
const jsonErrorFormatter = require('../json-error-formatter');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const {
  DB_URL,
  HTTP_PORT,
  JWT_SECRET,
  BCRYPT_PEPPER,
  NODE_ENV,
} = process.env;

const defaults = {
  db: {
    url: DB_URL,
    opt: {
      keepAlive: true,
      connectTimeoutMS: 0,
      socketTimeoutMS: 0,
      useNewUrlParser: true,
    },
  },
  http: {
    port: HTTP_PORT,
  },
  cors: {
    origin: '*',
    expose: ['X-Total', 'authsessiontoken', 'X-Response-Time'],
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
  },
  jwt: {
    options: {
      expiresIn: 60 * 60,
    },
    secret: JWT_SECRET,
    signUrl: [
      '/main/signin',
      '/main/signup',
    ],
  },
  bcrypt: {
    rounds: 10,
    pepper: BCRYPT_PEPPER,
  },
  jsonError: {
    format: jsonErrorFormatter,
  },
  schemaOptions: {
    versionKey: false,
    minimize: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
};

const development = {
};
const production = {
};

module.exports = {
  development: { ...defaults, ...development },
  production: { ...defaults, ...production },
}[NODE_ENV || 'development'];
