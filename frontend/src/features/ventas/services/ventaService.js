import api from '../../../config/axios';

export const ventaService = {
  getAll: async () => {
    const response = await api.get('/ventas');
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/ventas', data);
    return response.data;
  },

  anular: async (id) => {
    const response = await api.put(`/ventas/anular/${id}`);
    return response.data;
  }
};
