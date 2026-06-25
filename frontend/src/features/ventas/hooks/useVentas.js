import { useState, useEffect, useMemo } from 'react';
import { ventaService } from '../services/ventaService';
import { clienteService } from '../../clientes/services/clienteService';
import { productoService } from '../../productos/services/productoService';

export const useVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchVentas = async () => {
    setLoading(true);
    try {
      const [ventasData, clientesData, productosData] = await Promise.all([
        ventaService.getAll(),
        clienteService.getAll(),
        productoService.getAll()
      ]);
      setVentas(Array.isArray(ventasData) ? ventasData : []);
      setClientes(Array.isArray(clientesData) ? clientesData : []);
      setProductos(Array.isArray(productosData) ? productosData : []);
    } catch (err) {
      setError('Error al cargar las ventas');
    } finally {
      setLoading(false);
    }
  };

  const filteredVentas = useMemo(() => {
    return ventas.filter((venta) => {
      const clientName = venta.cliente_id?.nombre || venta.cliente_id?.apellido ? `${venta.cliente_id?.nombre || ''} ${venta.cliente_id?.apellido || ''}`.trim() : '';
      return clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (venta.estado || '').toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [ventas, searchTerm]);

  const paginatedVentas = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredVentas.slice(start, start + rowsPerPage);
  }, [filteredVentas, page, rowsPerPage]);

  const createVenta = async (data) => {
    try {
      await ventaService.create(data);
      await fetchVentas();
    } catch (err) {
      setError('Error al crear venta');
      throw err;
    }
  };

  const anularVenta = async (id) => {
    try {
      await ventaService.anular(id);
      await fetchVentas();
    } catch (err) {
      setError('Error al anular venta');
      throw err;
    }
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  return {
    ventas: paginatedVentas,
    totalCount: filteredVentas.length,
    clientes,
    productos,
    loading,
    error,
    page,
    rowsPerPage,
    searchTerm,
    handleChangePage: (_e, newPage) => setPage(newPage),
    handleChangeRowsPerPage: (e) => {
      setRowsPerPage(parseInt(e.target.value, 10));
      setPage(0);
    },
    handleSearchChange: (value) => {
      setSearchTerm(value);
      setPage(0);
    },
    createVenta,
    anularVenta
  };
};
