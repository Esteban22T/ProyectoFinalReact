import React, { useState } from 'react';
import {
  Container, Typography, Button, Box,
  CircularProgress, Alert, Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import { useVentas } from '../hooks/useVentas';
import { VentaTable } from './VentaTable';
import { VentaForm } from './VentaForm';
import { VentaFilters } from './VentaFilters';

export const VentaDashboard = () => {
  const {
    ventas, totalCount, clientes, productos, loading, error,
    page, rowsPerPage, searchTerm,
    handleChangePage, handleChangeRowsPerPage, handleSearchChange,
    createVenta, anularVenta
  } = useVentas();

  const [formOpen, setFormOpen] = useState(false);

  const handleSubmit = (data) => {
    createVenta(data);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 5 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#111827" gutterBottom>
            Gestión de ventas
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Controla ventas, stock y estado financiero con un flujo claro para cada operación.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setFormOpen(true)} sx={{ borderRadius: 2, px: 2.5, py: 1 }}>
          Nueva venta
        </Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'primary.main' }}>
        <PointOfSaleOutlinedIcon />
        <Typography variant="subtitle2" fontWeight={700}>Operaciones activas</Typography>
      </Box>

      <VentaFilters value={searchTerm} onChange={handleSearchChange} />

      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <VentaTable
          ventas={ventas}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onAnular={anularVenta}
        />
      )}

      <VentaForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        clientes={clientes}
        productos={productos}
      />
    </Container>
  );
};
