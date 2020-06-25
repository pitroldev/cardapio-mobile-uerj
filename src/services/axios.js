import axios from 'axios';

export const RUapi = axios.create({
  baseURL: 'http://www.restauranteuniversitario.uerj.br/',
});

RUapi.interceptors.request.use(config => {
  config.headers = { 'Cache-Control': 'no-cache' };
  return config;
});

export const GitApi = axios.create({
  baseURL: 'https://api.github.com/',
});
