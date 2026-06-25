import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Login, Register, Verificar } from './features/auth';
import { Layout } from './components/Layout';

import { ClienteDashboard } from './features/clientes';
import { ProveedorDashboard } from './features/proveedores';
import { ProductoDashboard } from './features/productos';
import { CompraDashboard } from './features/compras';
import { VentaDashboard } from './features/ventas';
import { DashboardPage } from './features/dashboard';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2f7a56' },
    secondary: { main: '#294b3d' },
    background: { default: '#f4f7f2', paper: '#fbfdf8' },
    text: { primary: '#183126', secondary: '#5f6f66' }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: { fontWeight: 800, letterSpacing: '-0.02em' }
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 7,
          boxShadow: 'none'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: '0 8px 24px rgba(24, 49, 38, 0.06)'
        }
      }
    }
  }
});

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verificar" element={<Verificar />} />

          <Route path="/dashboard" element={<PrivateRoute><Layout><DashboardPage /></Layout></PrivateRoute>} />
          <Route path="/clientes" element={<PrivateRoute><Layout><ClienteDashboard /></Layout></PrivateRoute>} />
          <Route path="/productos" element={<PrivateRoute><Layout><ProductoDashboard /></Layout></PrivateRoute>} />
          <Route path="/proveedores" element={<PrivateRoute><Layout><ProveedorDashboard /></Layout></PrivateRoute>} />
          <Route path="/compras" element={<PrivateRoute><Layout><CompraDashboard /></Layout></PrivateRoute>} />
          <Route path="/ventas" element={<PrivateRoute><Layout><VentaDashboard /></Layout></PrivateRoute>} />

          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;