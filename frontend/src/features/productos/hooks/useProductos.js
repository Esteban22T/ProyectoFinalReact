import { useState, useEffect, useMemo } from 'react';
import { productoService } from '../services/productoService';

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const data = await productoService.getAll();
      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const filteredProductos = useMemo(() => {
    return productos.filter((producto) =>
      producto.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.tipo?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [productos, searchTerm]);

  const paginatedProductos = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredProductos.slice(start, start + rowsPerPage);
  }, [filteredProductos, page, rowsPerPage]);

  const createProducto = async (data) => {
    try {
      await productoService.create(data);
      await fetchProductos();
    } catch (err) {
      setError('Error al crear producto');
      throw err;
    }
  };

  const updateProducto = async (id, data) => {
    try {
      await productoService.update(id, data);
      await fetchProductos();
    } catch (err) {
      setError('Error al actualizar producto');
      throw err;
    }
  };

  const deleteProducto = async (id) => {
    try {
      await productoService.delete(id);
      await fetchProductos();
    } catch (err) {
      setError('Error al eliminar producto');
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return {
    productos: paginatedProductos,
    totalCount: filteredProductos.length,
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
    createProducto,
    updateProducto,
    deleteProducto
  };
};
