import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Drawer,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const links = [
    {
      path: '/',
      label: 'Главная страница',
      exact: true,
    },
    {
      path: '/story',
      label: 'Страница новости',
      exact: false,
    },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Hacker News
      </Typography>
      <Divider />
      <List>
        {links.map(({ path, label, exact }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <NavLink to={path} exact={exact}>
                <ListItemText primary={label} sx={{ color: 'rgba(0, 0, 0, 0.87)' }} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const drawerWidth = 240;

  return (
    <Box data-testid="header" sx={{ display: 'flex' }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Hacker News
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {links.map(({ path, label, exact }) => (
                <NavLink key={label} to={path} exact={exact}>
                  <Button sx={{ color: '#fff' }}>{label}</Button>
                </NavLink>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};
