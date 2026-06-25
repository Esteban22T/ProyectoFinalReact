import React, { useState } from 'react';
import {
  Container, Typography, Button, Box,
  CircularProgress, Alert, Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { useProveedores } from '../hooks/useProveedores';
import { ProveedorTable } from './ProveedorTable';
import { ProveedorForm } from './ProveedorForm';
import { ProveedorFilters } from './ProveedorFilters';

export const ProveedorDashboard = () => {
  const {
    proveedores, totalCount, loading, error,
    page, rowsPerPage, searchTerm,
    handleChangePage, handleChangeRowsPerPage, handleSearchChange,
    createProveedor, updateProveedor, deleteProveedor
  } = useProveedores();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  const handleOpenCreate = () => { setSelectedProveedor(null); setFormOpen(true); };
  const handleOpenEdit = (p) => { setSelectedProveedor(p); setFormOpen(true); };

  const handleSubmit = (data) => {
    if (selectedProveedor) {
      updateProveedor(selectedProveedor._id, data);
    } else {
      createProveedor(data);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 5 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#111827" gutterBottom>
            Gestión de proveedores
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Organiza tus proveedores con una vista limpia y accionable.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate} sx={{ borderRadius: 2, px: 2.5, py: 1 }}>
          Agregar proveedor
        </Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'primary.main' }}>
        <LocalShippingOutlinedIcon />
        <Typography variant="subtitle2" fontWeight={700}>Red de proveedores</Typography>
      </Box>

      <ProveedorFilters value={searchTerm} onChange={handleSearchChange} />

      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <ProveedorTable
          proveedores={proveedores}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onEdit={handleOpenEdit}
          onDelete={deleteProveedor}
        />
      )}

      <ProveedorForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        proveedorToEdit={selectedProveedor}
      />
    </Container>
  );
};