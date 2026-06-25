import React, { useEffect, useState } from 'react';
import {
  Box, Container, Grid, Card, CardContent,
  Typography, Stack, CircularProgress, Alert, Chip
} from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import api from '../../../config/axios';

const statCards = [
  { key: 'clientes', label: 'Clientes', icon: <PeopleAltOutlinedIcon sx={{ fontSize: 30 }} />, color: '#3b82f6', bg: '#e8f0ff' },
  { key: 'proveedores', label: 'Proveedores', icon: <BusinessOutlinedIcon sx={{ fontSize: 30 }} />, color: '#0f766e', bg: '#dbf5ef' },
  { key: 'productos', label: 'Productos', icon: <Inventory2OutlinedIcon sx={{ fontSize: 30 }} />, color: '#ea580c', bg: '#ffe9d9' },
  { key: 'ventas', label: 'Ventas activas', icon: <PointOfSaleOutlinedIcon sx={{ fontSize: 30 }} />, color: '#be185d', bg: '#fde7f2' },
  { key: 'compras', label: 'Compras activas', icon: <ShoppingBagOutlinedIcon sx={{ fontSize: 30 }} />, color: '#0369a1', bg: '#e0f2fe' },
  { key: 'ingresos', label: 'Ingresos', icon: <AttachMoneyOutlinedIcon sx={{ fontSize: 30 }} />, color: '#15803d', bg: '#dcfce7' }
];

export const DashboardPage = () => {
  const [stats, setStats] = useState({
    clientes: 0,
    proveedores: 0,
    productos: 0,
    ventas: 0,
    compras: 0,
    ingresos: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [clientesRes, proveedoresRes, productosRes, comprasRes, ventasRes] = await Promise.all([
          api.get('/clientes'),
          api.get('/proveedores'),
          api.get('/productos'),
          api.get('/compras'),
          api.get('/ventas')
        ]);

        const comprasActivas = (comprasRes.data || []).filter((item) => item.estado === 'activa').length;
        const ventasActivas = (ventasRes.data || []).filter((item) => item.estado === 'activa').length;
        const ingresos = (ventasRes.data || [])
          .filter((item) => item.estado === 'activa')
          .reduce((acc, item) => acc + Number(item.total || 0), 0);

        setStats({
          clientes: (clientesRes.data || []).length,
          proveedores: (proveedoresRes.data || []).length,
          productos: (productosRes.data || []).length,
          ventas: ventasActivas,
          compras: comprasActivas,
          ingresos
        });
      } catch (err) {
        setError('No se pudieron cargar las métricas');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatValue = (cardKey, value) => {
    if (cardKey === 'ingresos') {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
      }).format(Number(value || 0));
    }

    return value;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 5 }}>
      <Box sx={{ mb: 4, p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #f5fbf6 0%, #edf6ee 100%)', border: '1px solid #dfeee2' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
          <Box>
            <Typography variant="h4" fontWeight={800} color="#183126" gutterBottom>
              Panel de control
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Resumen operativo de clientes, proveedores, inventario y movimientos del negocio.
            </Typography>
          </Box>
          <Chip label="Actualizado en tiempo real" color="success" variant="outlined" sx={{ borderRadius: 999, px: 1 }} />
        </Stack>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box display="flex" justifyContent="center" my={6}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {statCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.key}>
              <Card sx={{ height: '100%', border: '1px solid #e7efe4' }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1.2, fontWeight: 700 }}>
                        {card.label}
                      </Typography>
                      <Typography variant="h4" fontWeight={800} sx={{ mt: 0.8, lineHeight: 1.1 }}>
                        {formatValue(card.key, stats[card.key])}
                      </Typography>
                    </Box>
                    <Box sx={{ bgcolor: card.bg, color: card.color, borderRadius: 2, width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {card.icon}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
