import { useState, useEffect, useMemo } from 'react';
import { clienteService } from '../services/clienteService';

export const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchClientes = async () => {
    setLoading(true);
    try {
      const data = await clienteService.getAll();
      setClientes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Error al cargar los clientes');
    } finally {
      setLoading(false);
    }
  };

  const filteredClientes = useMemo(() => {
    return clientes.filter((c) =>
      c.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.correo?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clientes, searchTerm]);

  const paginatedClientes = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredClientes.slice(start, start + rowsPerPage);
  }, [filteredClientes, page, rowsPerPage]);

  const createCliente = async (data) => {
    try {
      await clienteService.create(data);
      await fetchClientes();
    } catch (err) {
      setError('Error al crear cliente');
      throw err;
    }
  };

  const updateCliente = async (id, data) => {
    try {
      await clienteService.update(id, data);
      await fetchClientes();
    } catch (err) {
      setError('Error al actualizar cliente');
      throw err;
    }
  };

  const deleteCliente = async (id) => {
    try {
      await clienteService.delete(id);
      await fetchClientes();
    } catch (err) {
      setError('Error al eliminar cliente');
    }
  };

  useEffect(() => { fetchClientes(); }, []);

  return {
    clientes: paginatedClientes,
    totalCount: filteredClientes.length,
    loading, error,
    page, rowsPerPage, searchTerm,
    handleChangePage: (e, newPage) => setPage(newPage),
    handleChangeRowsPerPage: (e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); },
    handleSearchChange: (value) => { setSearchTerm(value); setPage(0); },
    createCliente, updateCliente, deleteCliente
  };
};