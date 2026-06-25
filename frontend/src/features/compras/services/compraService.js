import api from '../../../config/axios';

export const compraService = {
  getAll: async () => {
    const response = await api.get('/compras');
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/compras', data);
    return response.data;
  },

  anular: async (id) => {
    const response = await api.put(`/compras/anular/${id}`);
    return response.data;
  }
};
