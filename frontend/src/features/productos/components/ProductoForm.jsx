import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, MenuItem, Typography
} from '@mui/material';

const initialState = {
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '0',
  tipo: 'Producto'
};

export const ProductoForm = ({ open, onClose, onSubmit, productoToEdit }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (productoToEdit) {
      setFormData({
        nombre: productoToEdit.nombre || '',
        descripcion: productoToEdit.descripcion || '',
        precio: productoToEdit.precio ?? '',
        stock: productoToEdit.stock ?? '0',
        tipo: productoToEdit.tipo || 'Producto'
      });
    } else {
      setFormData(initialState);
    }
  }, [productoToEdit, open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      precio: Number(formData.precio),
      stock: Number(formData.stock)
    };
    await onSubmit(payload);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ bgcolor: '#4f46e5', color: 'white', fontWeight: 700, py: 2.5 }}>
        {productoToEdit ? 'Editar producto' : 'Nuevo producto'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3 }}>
          <Box display="flex" flexDirection="column" gap={2.2}>
            <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required fullWidth />
            <TextField label="Descripción" name="descripcion" value={formData.descripcion} onChange={handleChange} required fullWidth multiline rows={3} />
            <Box display="flex" gap={2}>
              <TextField label="Precio" name="precio" type="number" value={formData.precio} onChange={handleChange} required fullWidth inputProps={{ min: 0, step: '0.01' }} />
              <TextField label="Stock" name="stock" type="number" value={formData.stock} onChange={handleChange} fullWidth InputProps={{ readOnly: !productoToEdit }} inputProps={{ min: 0 }} />
            </Box>
            <TextField label="Tipo" name="tipo" select value={formData.tipo} onChange={handleChange} fullWidth>
              <MenuItem value="Producto">Producto</MenuItem>
              <MenuItem value="Servicio">Servicio</MenuItem>
            </TextField>
            <Typography variant="body2" color="text.secondary">
              El stock se mantiene actualizado según las compras y ventas registradas.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={onClose} variant="outlined" color="inherit" sx={{ borderRadius: 2 }}>Cancelar</Button>
          <Button type="submit" variant="contained" sx={{ borderRadius: 2 }}>Guardar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
