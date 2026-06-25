import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const ProveedorTable = ({
  proveedores, onEdit, onDelete,
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
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Dirección</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }} align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proveedores.map((p, index) => (
              <TableRow key={p._id} hover sx={{ backgroundColor: index % 2 === 0 ? '#fcfdf8' : '#f7faf4' }}>
                <TableCell>{p.nombre}</TableCell>
                <TableCell>{p.apellido}</TableCell>
                <TableCell>{p.correo}</TableCell>
                <TableCell>{p.telefono}</TableCell>
                <TableCell>{p.direccion}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(p)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(p._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {proveedores.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  No se encontraron proveedores.
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