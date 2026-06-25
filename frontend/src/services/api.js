import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
};

export const productAPI = {
  getAll: () => API.get('/products'),
  getById: (id) => API.get(`/products/${id}`),
  search: (keyword) => API.get(`/products/search?keyword=${keyword}`),
  getByCategory: (id) => API.get(`/products/category/${id}`),
};

export const categoryAPI = {
  getAll: () => API.get('/categories'),
};

export const cartAPI = {
  get: () => API.get('/cart'),
  add: (productId, quantity = 1) => API.post(`/cart/add/${productId}?quantity=${quantity}`),
  remove: (productId) => API.delete(`/cart/remove/${productId}`),
  update: (productId, quantity) => API.put(`/cart/update/${productId}?quantity=${quantity}`),
};

export const orderAPI = {
  place: (data) => API.post('/orders/place', data),
  getAll: () => API.get('/orders'),
  getById: (id) => API.get(`/orders/${id}`),
};

export default API;
