import axios from 'axios';
import config from '../../../config';
const headers = { 'Content-Type': 'application/json' };

export const authHttp = axios.create({ headers, baseURL: config.PAYONEER_AUTH_URL });

export const apiHtpp = axios.create({ headers, baseURL: config.PAYONEER_API_URL });
