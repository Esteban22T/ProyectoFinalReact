import React, { useState } from 'react';
import {
  Container, Typography, Button, Box,
  CircularProgress, Alert, Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { useClientes } from '../hooks/useClientes';
import { ClienteTable } from './ClienteTable';
import { ClienteForm } from './ClienteForm';
import { ClienteFilters } from './ClienteFilters';

export const ClienteDashboard = () => {
  const {
    clientes, totalCount, loading, error,
    page, rowsPerPage, searchTerm,
    handleChangePage, handleChangeRowsPerPage, handleSearchChange,
    createCliente, updateCliente, deleteCliente
  } = useClientes();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const handleOpenCreate = () => { setSelectedCliente(null); setFormOpen(true); };
  const handleOpenEdit = (cliente) => { setSelectedCliente(cliente); setFormOpen(true); };

  const handleSubmit = (data) => {
    if (selectedCliente) {
      updateCliente(selectedCliente._id, data);
    } else {
      createCliente(data);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 5 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#111827" gutterBottom>
            Gestión de clientes
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Mantén un registro claro y elegante de tus clientes clave.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate} sx={{ borderRadius: 2, px: 2.5, py: 1 }}>
          Agregar cliente
        </Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'primary.main' }}>
        <PeopleAltOutlinedIcon />
        <Typography variant="subtitle2" fontWeight={700}>Base de clientes</Typography>
      </Box>

      <ClienteFilters value={searchTerm} onChange={handleSearchChange} />

      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <ClienteTable
          clientes={clientes}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onEdit={handleOpenEdit}
          onDelete={deleteCliente}
        />
      )}

      <ClienteForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        clienteToEdit={selectedCliente}
      />
    </Container>
  );
};