import { useState, useEffect, useMemo } from 'react';
import { proveedorService } from '../services/proveedorService';

export const useProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProveedores = async () => {
    setLoading(true);
    try {
      const data = await proveedorService.getAll();
      setProveedores(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Error al cargar proveedores');
    } finally {
      setLoading(false);
    }
  };

  const filteredProveedores = useMemo(() => {
    return proveedores.filter((p) =>
      p.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.correo?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [proveedores, searchTerm]);

  const paginatedProveedores = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredProveedores.slice(start, start + rowsPerPage);
  }, [filteredProveedores, page, rowsPerPage]);

  const createProveedor = async (data) => {
    try {
      await proveedorService.create(data);
      await fetchProveedores();
    } catch (err) {
      setError('Error al crear proveedor');
      throw err;
    }
  };

  const updateProveedor = async (id, data) => {
    try {
      await proveedorService.update(id, data);
      await fetchProveedores();
    } catch (err) {
      setError('Error al actualizar proveedor');
      throw err;
    }
  };

  const deleteProveedor = async (id) => {
    try {
      await proveedorService.delete(id);
      await fetchProveedores();
    } catch (err) {
      setError('Error al eliminar proveedor');
    }
  };

  useEffect(() => { fetchProveedores(); }, []);

  return {
    proveedores: paginatedProveedores,
    totalCount: filteredProveedores.length,
    loading, error,
    page, rowsPerPage, searchTerm,
    handleChangePage: (e, newPage) => setPage(newPage),
    handleChangeRowsPerPage: (e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); },
    handleSearchChange: (value) => { setSearchTerm(value); setPage(0); },
    createProveedor, updateProveedor, deleteProveedor
  };
};