import React, { useState } from 'react';
import {
  Container, Box, TextField, Button, Typography,
  Alert, CircularProgress, Paper
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '', correo: '', telefono: '', password: '', confirmar: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmar) {
      return alert('Las contraseñas no coinciden');
    }
    try {
      const data = await register(formData);
      setSuccess(`Tu token de verificación es: ${data.token}`);
    } catch {}
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
            Registro
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required fullWidth />
            <TextField label="Correo" name="correo" type="email" value={formData.correo} onChange={handleChange} required fullWidth />
            <TextField label="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} required fullWidth />
            <TextField label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} required fullWidth />
            <TextField label="Confirmar contraseña" name="confirmar" type="password" value={formData.confirmar} onChange={handleChange} required fullWidth />

            <Button type="submit" variant="contained" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Registrarse'}
            </Button>

            <Button variant="text" onClick={() => navigate('/login')}>
              ¿Ya tienes cuenta? Inicia sesión
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};