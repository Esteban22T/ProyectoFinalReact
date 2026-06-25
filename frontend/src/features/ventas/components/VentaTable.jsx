import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TablePagination, Chip, Button
} from '@mui/material';

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

export const VentaTable = ({
  ventas, totalCount, page, rowsPerPage,
  onPageChange, onRowsPerPageChange, onAnular
}) => {
  return (
    <Paper sx={{ width: '100%', mt: 3, boxShadow: '0 12px 28px rgba(24, 49, 38, 0.08)', border: '1px solid #e7efe4', borderRadius: 0, overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#294b3d' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Cliente</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Fecha</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Total</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Estado</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }} align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ventas.map((venta, index) => (
              <TableRow key={venta._id} hover sx={{ backgroundColor: index % 2 === 0 ? '#fcfdf8' : '#f7faf4' }}>
                <TableCell>{venta.cliente_id?.nombre} {venta.cliente_id?.apellido}</TableCell>
                <TableCell>{new Date(venta.fecha).toLocaleDateString()}</TableCell>
                <TableCell>{formatCurrency(venta.total)}</TableCell>
                <TableCell>
                  <Chip label={venta.estado} color={venta.estado === 'activa' ? 'success' : 'default'} size="small" />
                </TableCell>
                <TableCell align="center">
                  {venta.estado === 'activa' && (
                    <Button color="warning" variant="outlined" size="small" onClick={() => onAnular(venta._id)} sx={{ borderRadius: 2 }}>
                      Anular
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {ventas.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  No se encontraron ventas.
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
