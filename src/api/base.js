import axios from 'axios';

const base = 'http://localhost:8360/fastfood/api';

export default class BaseService {
  get(url) {
    return axios.get(base + url);
  }

  post(url, params) {
    return axios.post(base + url, params);
  }
}
