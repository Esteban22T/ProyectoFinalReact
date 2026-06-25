import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, TablePagination, Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const ProductoTable = ({
  productos, onEdit, onDelete,
  totalCount, page, rowsPerPage,
  onPageChange, onRowsPerPageChange
}) => {
  return (
    <Paper sx={{ width: '100%', mt: 3, boxShadow: '0 12px 28px rgba(24, 49, 38, 0.08)', border: '1px solid #e7efe4', borderRadius: 0, overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#294b3d' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Nombre</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Descripción</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Precio</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Stock</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Tipo</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }} align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto, index) => (
              <TableRow key={producto._id} hover sx={{ backgroundColor: index % 2 === 0 ? '#fcfdf8' : '#f7faf4' }}>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>{producto.descripcion}</TableCell>
                <TableCell>${Number(producto.precio).toFixed(2)}</TableCell>
                <TableCell>{producto.stock}</TableCell>
                <TableCell>
                  <Chip label={producto.tipo} size="small" color={producto.tipo === 'Servicio' ? 'secondary' : 'primary'} variant="outlined" />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(producto)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(producto._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {productos.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  No se encontraron productos.
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
