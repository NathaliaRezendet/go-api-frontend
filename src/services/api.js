import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // Adicionar esta linha
});

export const getClients = (page = 1, pageSize = 10) => 
  api.get(`/clients?page=${page}&page_size=${pageSize}`);
export const getClient = (id) => api.get(`/client/${id}`);
export const createClient = (client) => api.post('/client', client);
export const updateClient = (id, client) => api.put(`/client/${id}`, client);
export const deleteClient = (id) => api.delete(`/client/${id}`);

export const getBenefits = () => api.get('/benefits');

export const getBilling = () => api.get('/billings');

export const getPartner = () => api.get('/partners');

export const getProduct = () => api.get('/products');

export const getResource_usage = () => api.get('/resource_usages');

export const getService_infos = () => api.get('/service_infos');

export const getSubscription = () => api.get('/subscriptions');

export default api;
