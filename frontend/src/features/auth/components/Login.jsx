import React, { useState } from 'react';
import {
  Container, Box, TextField, Button, Typography,
  Alert, CircularProgress, Paper
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ correo: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch {}
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
            Iniciar Sesión
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            <TextField label="Correo" name="correo" type="email" value={formData.correo} onChange={handleChange} required fullWidth />
            <TextField label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} required fullWidth />

            <Button type="submit" variant="contained" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Ingresar'}
            </Button>

            <Button variant="text" onClick={() => navigate('/register')}>
              ¿No tienes cuenta? Regístrate
            </Button>

            <Button variant="text" onClick={() => navigate('/verificar')}>
              Verificar mi cuenta
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};