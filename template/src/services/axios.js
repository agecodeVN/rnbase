import axios from 'axios';
import { API_ROOT, TIMEOUT } from 'configs/constants/api';

const instance = axios.create({
  baseURL: API_ROOT,
  timeout: TIMEOUT
});

export function setDefaultHeaders(headers) {
  Object.keys(headers).forEach(key => {
    instance.defaults.headers.common[key] = headers[key];
  });
}

export default instance;
