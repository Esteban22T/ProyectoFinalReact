import { useState, useEffect, useMemo } from 'react';
import { compraService } from '../services/compraService';
import { proveedorService } from '../../proveedores/services/proveedorService';
import { productoService } from '../../productos/services/productoService';

export const useCompras = () => {
  const [compras, setCompras] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCompras = async () => {
    setLoading(true);
    try {
      const [comprasData, proveedoresData, productosData] = await Promise.all([
        compraService.getAll(),
        proveedorService.getAll(),
        productoService.getAll()
      ]);
      setCompras(Array.isArray(comprasData) ? comprasData : []);
      setProveedores(Array.isArray(proveedoresData) ? proveedoresData : []);
      setProductos(Array.isArray(productosData) ? productosData : []);
    } catch (err) {
      setError('Error al cargar las compras');
    } finally {
      setLoading(false);
    }
  };

  const filteredCompras = useMemo(() => {
    return compras.filter((compra) => {
      const proveedorName = compra.proveedor_id?.nombre || compra.proveedor_id?.apellido ? `${compra.proveedor_id?.nombre || ''} ${compra.proveedor_id?.apellido || ''}`.trim() : '';
      return proveedorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (compra.estado || '').toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [compras, searchTerm]);

  const paginatedCompras = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredCompras.slice(start, start + rowsPerPage);
  }, [filteredCompras, page, rowsPerPage]);

  const createCompra = async (data) => {
    try {
      await compraService.create(data);
      await fetchCompras();
    } catch (err) {
      setError('Error al crear compra');
      throw err;
    }
  };

  const anularCompra = async (id) => {
    try {
      await compraService.anular(id);
      await fetchCompras();
    } catch (err) {
      setError('Error al anular compra');
      throw err;
    }
  };

  useEffect(() => {
    fetchCompras();
  }, []);

  return {
    compras: paginatedCompras,
    totalCount: filteredCompras.length,
    proveedores,
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
    createCompra,
    anularCompra
  };
};
