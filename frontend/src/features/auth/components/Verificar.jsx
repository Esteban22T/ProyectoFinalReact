import React, { useState } from 'react';
import {
  Container, Box, TextField, Button, Typography,
  Alert, CircularProgress, Paper
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Verificar = () => {
  const { verificar, loading, error } = useAuth();
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [token, setToken] = useState('');
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await verificar(correo, token);
      setSuccess(data.msg);
      setTimeout(() => navigate('/login'), 2000);
    } catch {}
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
            Verificar Cuenta
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            <TextField label="Correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required fullWidth />
            <TextField label="Token de 6 dígitos" value={token} onChange={(e) => setToken(e.target.value)} required fullWidth inputProps={{ maxLength: 6 }} />

            <Button type="submit" variant="contained" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Verificar'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};