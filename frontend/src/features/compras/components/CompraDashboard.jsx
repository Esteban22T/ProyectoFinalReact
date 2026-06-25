import React, { useState } from 'react';
import {
  Container, Typography, Button, Box,
  CircularProgress, Alert, Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useCompras } from '../hooks/useCompras';
import { CompraTable } from './CompraTable';
import { CompraForm } from './CompraForm';
import { CompraFilters } from './CompraFilters';

export const CompraDashboard = () => {
  const {
    compras, totalCount, proveedores, productos, loading, error,
    page, rowsPerPage, searchTerm,
    handleChangePage, handleChangeRowsPerPage, handleSearchChange,
    createCompra, anularCompra
  } = useCompras();

  const [formOpen, setFormOpen] = useState(false);

  const handleSubmit = (data) => {
    createCompra(data);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 5 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#111827" gutterBottom>
            Gestión de compras
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Registra compras con múltiples productos y mantén el control del total y del estado.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setFormOpen(true)} sx={{ borderRadius: 2, px: 2.5, py: 1 }}>
          Nueva compra
        </Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'primary.main' }}>
        <ShoppingBagOutlinedIcon />
        <Typography variant="subtitle2" fontWeight={700}>Movimientos activos</Typography>
      </Box>

      <CompraFilters value={searchTerm} onChange={handleSearchChange} />

      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <CompraTable
          compras={compras}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onAnular={anularCompra}
        />
      )}

      <CompraForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        proveedores={proveedores}
        productos={productos}
      />
    </Container>
  );
};
