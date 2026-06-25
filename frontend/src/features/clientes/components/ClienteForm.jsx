import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box
} from '@mui/material';

export const ClienteForm = ({ open, onClose, onSubmit, clienteToEdit }) => {
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', correo: '', telefono: ''
  });

  useEffect(() => {
    if (clienteToEdit) {
      setFormData({
        nombre: clienteToEdit.nombre,
        apellido: clienteToEdit.apellido,
        correo: clienteToEdit.correo,
        telefono: clienteToEdit.telefono
      });
    } else {
      setFormData({ nombre: '', apellido: '', correo: '', telefono: '' });
    }
  }, [clienteToEdit, open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 'bold', pt: 3 }}>
        {clienteToEdit ? 'Editar Cliente' : 'Nuevo Cliente'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 1 }}>
            <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required fullWidth />
            <TextField label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} required fullWidth />
            <TextField label="Correo" name="correo" type="email" value={formData.correo} onChange={handleChange} required fullWidth />
            <TextField label="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} required fullWidth />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={onClose} variant="outlined" color="inherit">Cancelar</Button>
          <Button type="submit" variant="contained">Guardar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};