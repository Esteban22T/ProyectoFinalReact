import React, { useState } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Typography, IconButton,
  Toolbar, AppBar, Button
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Clientes', icon: <PeopleIcon />, path: '/clientes' },
  { text: 'Productos', icon: <InventoryIcon />, path: '/productos' },
  { text: 'Proveedores', icon: <LocalShippingIcon />, path: '/proveedores' },
  { text: 'Compras', icon: <ShoppingCartIcon />, path: '/compras' },
  { text: 'Ventas', icon: <PointOfSaleIcon />, path: '/ventas' }
];

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nombre = localStorage.getItem('nombre');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ height: '100%', background: 'linear-gradient(180deg, #23463b 0%, #1a332b 100%)', color: 'white', boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.05)', borderTopRightRadius: 24, borderBottomRightRadius: 24, overflow: 'hidden' }}>
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
        <Typography color="white" fontWeight={800} sx={{ fontSize: { xs: 24, sm: 29 }, lineHeight: 1.08, letterSpacing: '-0.02em' }}>
          GestorApp
        </Typography>
        <Typography variant="body2" color="rgba(255,255,255,0.78)" sx={{ mt: 0.6 }}>
          Hola, {nombre || 'usuario'}
        </Typography>
      </Box>
      <List sx={{ px: 1.2, py: 1.8 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.6 }}>
              <ListItemButton
                selected={isSelected}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 0,
                  color: 'white',
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255,255,255,0.16)',
                    color: 'white'
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.08)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: isSelected ? 'white' : 'rgba(255,255,255,0.8)', minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f2' }}>
      <AppBar position="fixed" sx={{ display: { sm: 'none' }, background: 'linear-gradient(90deg, #2f5f4a 0%, #284c3a 100%)', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setMobileOpen(!mobileOpen)}>
            <MenuIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 1, fontWeight: 800, fontSize: { xs: 20, sm: 24 }, letterSpacing: '-0.02em' }}>GestorApp</Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Salir
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', backgroundColor: 'transparent', boxShadow: '12px 0 30px rgba(14, 27, 23, 0.2)', borderTopRightRadius: 24, borderBottomRightRadius: 24, overflow: 'hidden', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', backgroundColor: 'transparent', borderRight: 'none', boxShadow: '12px 0 30px rgba(14, 27, 23, 0.2)', borderTopRightRadius: 24, borderBottomRightRadius: 24, overflow: 'hidden', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } }}
          open
        >
          {drawer}
          <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
            <Button fullWidth variant="outlined" startIcon={<LogoutIcon />} onClick={handleLogout} sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', borderRadius: 1 }}>
              Cerrar sesión
            </Button>
          </Box>
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }, mt: { xs: 8, sm: 0 }, minHeight: '100vh', backgroundColor: '#f3f6f0' }}>
        {children}
      </Box>
    </Box>
  );
};