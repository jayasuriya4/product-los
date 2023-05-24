import Axios from 'axios';
import CONFIG from '../config';

export const defaultConnector = Axios.create({
  baseURL: CONFIG.api
});

const authConnector = Axios.create({
  baseURL: CONFIG.api
});

// authConnector.interceptors.request.use(config => {
//   config.headers.Authorization = Storage.getItem('token');
//   return config;
// }, error => error);

export default authConnector;
