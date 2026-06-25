import api from '../../../config/axios';

export const clienteService = {
  getAll: async () => {
    const response = await api.get('/clientes');
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/clientes', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/clientes/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/clientes/${id}`);
    return response.data;
  }
};