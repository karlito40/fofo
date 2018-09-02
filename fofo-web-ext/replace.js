require('dotenv').config({path: `.env.${process.env.NODE_ENV}`});
const replace = require('replace-in-file');

replace.sync({
  files: './dist/public/*.html',
  from: '%APP_URL%',
  to: process.env.APP_URL,
});
