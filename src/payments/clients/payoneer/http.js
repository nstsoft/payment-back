const axios = require('axios');
const config = require('../../../config');

exports.authHttp = axios.create({
  baseURL: config.PAYONEER_AUTH_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

exports.apiHtpp = axios.create({
  baseURL: config.PAYONEER_API_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});
