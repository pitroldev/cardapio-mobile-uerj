import axios from 'axios';

export const RUapi = axios.create({
  baseURL: 'http://www.restauranteuniversitario.uerj.br/',
});

export const GitApi = axios.create({
  baseURL: 'https://api.github.com/',
});
