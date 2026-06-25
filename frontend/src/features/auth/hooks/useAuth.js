import { useState } from 'react';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.register(userData);
      return data;
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al registrarse');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verificar = async (correo, token) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.verificar({ correo, token });
      return data;
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al verificar');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(credentials);
      localStorage.setItem('token', data.token);
      localStorage.setItem('nombre', data.nombre);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al iniciar sesión');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    navigate('/login');
  };

  return { register, verificar, login, logout, loading, error };
};