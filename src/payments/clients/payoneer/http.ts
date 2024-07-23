import axios from 'axios';
import config from '../../../config';

export const authHttp = axios.create({
  baseURL: config.PAYONEER_AUTH_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export const apiHtpp = axios.create({
  baseURL: config.PAYONEER_API_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});
