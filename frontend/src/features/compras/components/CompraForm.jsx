import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, MenuItem, IconButton, Typography, Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const initialItem = () => ({ producto_id: '', nombre: '', precio: '', cantidad: 1 });

const initialState = {
  proveedor_id: '',
  fecha: new Date().toISOString().slice(0, 10),
  productos: [initialItem()]
};

export const CompraForm = ({ open, onClose, onSubmit, proveedores, productos }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (open) {
      setFormData(initialState);
    }
  }, [open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.productos];
    updatedItems[index][field] = value;

    if (field === 'producto_id') {
      const selected = productos.find((producto) => producto._id === value);
      updatedItems[index].nombre = selected?.nombre || '';
      updatedItems[index].precio = selected?.precio || '';
    }

    setFormData({ ...formData, productos: updatedItems });
  };

  const addItem = () => {
    setFormData({ ...formData, productos: [...formData.productos, initialItem()] });
  };

  const removeItem = (index) => {
    const updated = formData.productos.filter((_, i) => i !== index);
    setFormData({ ...formData, productos: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      fecha: new Date(formData.fecha).toISOString(),
      total: formData.productos.reduce((acc, item) => acc + Number(item.precio || 0) * Number(item.cantidad || 0), 0),
      productos: formData.productos.map((item) => ({
        producto_id: item.producto_id,
        nombre: item.nombre,
        precio: Number(item.precio || 0),
        cantidad: Number(item.cantidad || 0)
      }))
    };
    await onSubmit(payload);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ bgcolor: '#4f46e5', color: 'white', fontWeight: 700, py: 2.5 }}>
        Nueva compra
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3 }}>
          <Box display="flex" flexDirection="column" gap={2.2}>
            <TextField label="Proveedor" name="proveedor_id" select value={formData.proveedor_id} onChange={handleChange} required fullWidth>
              {proveedores.map((proveedor) => (
                <MenuItem key={proveedor._id} value={proveedor._id}>
                  {proveedor.nombre} {proveedor.apellido}
                </MenuItem>
              ))}
            </TextField>

            <TextField label="Fecha" name="fecha" type="date" value={formData.fecha} onChange={handleChange} required fullWidth InputLabelProps={{ shrink: true }} />

            <Typography variant="subtitle2" fontWeight={700}>Productos</Typography>
            {formData.productos.map((item, index) => (
              <Box key={index} sx={{ border: '1px solid #e5e7eb', borderRadius: 2, p: 2 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
                  <TextField label="Producto" select value={item.producto_id} onChange={(e) => handleItemChange(index, 'producto_id', e.target.value)} required fullWidth>
                    {productos.map((producto) => (
                      <MenuItem key={producto._id} value={producto._id}>
                        {producto.nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField label="Cantidad" type="number" value={item.cantidad} onChange={(e) => handleItemChange(index, 'cantidad', e.target.value)} required inputProps={{ min: 1 }} sx={{ minWidth: 140 }} />
                  <IconButton color="error" onClick={() => removeItem(index)} disabled={formData.productos.length === 1}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Box>
            ))}

            <Button startIcon={<AddIcon />} onClick={addItem} sx={{ alignSelf: 'flex-start', borderRadius: 2 }}>
              Agregar producto
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={onClose} variant="outlined" color="inherit" sx={{ borderRadius: 2 }}>Cancelar</Button>
          <Button type="submit" variant="contained" sx={{ borderRadius: 2 }}>Guardar compra</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
