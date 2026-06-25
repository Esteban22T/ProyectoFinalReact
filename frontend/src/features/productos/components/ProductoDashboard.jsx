import React, { useState } from 'react';
import {
  Container, Typography, Button, Box,
  CircularProgress, Alert, Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { useProductos } from '../hooks/useProductos';
import { ProductoTable } from './ProductoTable';
import { ProductoForm } from './ProductoForm';
import { ProductoFilters } from './ProductoFilters';

export const ProductoDashboard = () => {
  const {
    productos, totalCount, loading, error,
    page, rowsPerPage, searchTerm,
    handleChangePage, handleChangeRowsPerPage, handleSearchChange,
    createProducto, updateProducto, deleteProducto
  } = useProductos();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);

  const handleOpenCreate = () => {
    setSelectedProducto(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (producto) => {
    setSelectedProducto(producto);
    setFormOpen(true);
  };

  const handleSubmit = (data) => {
    if (selectedProducto) {
      updateProducto(selectedProducto._id, data);
    } else {
      createProducto(data);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 5 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#111827" gutterBottom>
            Catálogo de productos
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Administra productos y servicios con stock y precio visibles en un solo lugar.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate} sx={{ borderRadius: 2, px: 2.5, py: 1 }}>
          Nuevo producto
        </Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'primary.main' }}>
        <Inventory2OutlinedIcon />
        <Typography variant="subtitle2" fontWeight={700}>Inventario activo</Typography>
      </Box>

      <ProductoFilters value={searchTerm} onChange={handleSearchChange} />

      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <ProductoTable
          productos={productos}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onEdit={handleOpenEdit}
          onDelete={deleteProducto}
        />
      )}

      <ProductoForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        productoToEdit={selectedProducto}
      />
    </Container>
  );
};
