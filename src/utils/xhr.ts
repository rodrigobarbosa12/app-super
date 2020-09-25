/* @flow */

import axios from 'axios';
// import qs from 'qs';
import API_SUPER from './constants';

const xhr = axios.create({
  baseURL: API_SUPER,
//   paramsSerializer: qs.stringify,
});

xhr.interceptors.response.use((response) => response, (error) => {
  // if (error.response && error.response.status === 401) {
  //   return error.response;
  // }
  return Promise.reject(error);
});

export default xhr;
