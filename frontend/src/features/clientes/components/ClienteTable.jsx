import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const ClienteTable = ({
  clientes, onEdit, onDelete,
  totalCount, page, rowsPerPage,
  onPageChange, onRowsPerPageChange
}) => {
  return (
    <Paper sx={{ width: '100%', mt: 3, boxShadow: '0 10px 24px rgba(24, 49, 38, 0.06)', border: '1px solid #e7efe4', borderRadius: 2 }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#294b3d' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Nombre</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Apellido</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Correo</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Teléfono</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }} align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente, index) => (
              <TableRow key={cliente._id} hover sx={{ backgroundColor: index % 2 === 0 ? '#fcfdf8' : '#f7faf4' }}>
                <TableCell>{cliente.nombre}</TableCell>
                <TableCell>{cliente.apellido}</TableCell>
                <TableCell>{cliente.correo}</TableCell>
                <TableCell>{cliente.telefono}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(cliente)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(cliente._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {clientes.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  No se encontraron clientes.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
    </Paper>
  );
};