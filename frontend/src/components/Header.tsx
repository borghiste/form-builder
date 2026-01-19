
import React, { useState } from 'react';
// MUI
import { Box, Switch, Button, Typography, AppBar, Link, ButtonGroup } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';

// COMPONENTS
import SignUpButton from './UI/SignUpButton';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { Logout, selectUser } from '../features/UserSlice';
import { switchToDarkMode, selectMode } from '../features/themeSlice';
import BasicButton from './UI/BasicButton';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const darkModeIsOn = useSelector(selectMode);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    dispatch(Logout());
  };

  const handleThemeToggle = () => {
    dispatch(switchToDarkMode(!darkModeIsOn));
  };

  // Costruzione dinamica delle pagine in base allo stato utente
  const pages = [
    { name: 'Home', path: '/' },
    ...(user?.id
      ? [
          { name: 'Forms', path: '/forms' },
          ...(user?.role === 'admin'
            ? [{ name: 'Entries', path: '/FormEntries' }]
            : []
          ),
          { 
            name: 'Logout', 
            path: '/login', 
            onClick: handleLogout 
          },
        ]
      : [{ name: 'Login', path: '/login' }]
    ),
  ];

  return (
    <AppBar component="header" position="sticky" sx={{ bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo / Brand - Desktop */}
          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 650,
              letterSpacing: '.2rem',
              color: 'text.primary',
              textDecoration: 'none',
            }}
          >
            FormAtion
          </Typography>

          {/* Menu Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu di navigazione"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => {
                    handleCloseNavMenu();
                    if (page.onClick) {
                      page.onClick();
                    }
                  }}
                >
                  <Typography
                    component="a"
                    href={page.path}
                    sx={{
                      textAlign: 'center',
                      textDecoration: 'none',
                      color: 'text.primary',
                      width: '100%',
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
              <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', marginRight:' 10rem'}}>
          {/* Logo / Brand - Mobile */}
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              fontFamily: 'monospace',
              fontWeight: 650,
              letterSpacing: '.2rem',
              color: 'text.primary',
              textDecoration: 'none',
            }}
          >
             FormAtion
          </Typography>
          <ButtonGroup sx={{display:{xs:'flex', md:'none'}, alignItems:'center', justifyContent:'center'}}>
          <SignUpButton/>
          
          <BasicButton text={'login'}
          variant={'contained'}
          textColor={'primary'}/>


          </ButtonGroup>
          </Box>

          {/* Menu Desktop */}
          <Box
            component="nav"
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={(e) => {
                  if (page.onClick) {
                    e.preventDefault();
                    page.onClick();
                  }
                }}
                sx={{ my: 2, display: 'block' }}
              >
                <Link
                  href={page.path}
                  sx={{
                    color: 'text.primary',
                    textDecoration: 'none',
                  }}
                >
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>

          {/* Theme Toggle e User Info */}
          <Box
            sx={{
              flexGrow: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <LightModeIcon
              sx={{
                color: darkModeIsOn ? 'text.secondary' : 'warning.main',
              }}
            />
            <Switch
              color="primary"
              checked={darkModeIsOn}
              onChange={handleThemeToggle}
              inputProps={{ 'aria-label': 'Cambia tema scuro/chiaro' }}
            />
            <DarkModeIcon
              sx={{
                color: darkModeIsOn ? 'primary.main' : 'text.secondary',
              }}
            />

            {user?.id && (
              <Typography
                variant="body2"
                component="span"
                sx={{
                  ml: 2,
                  color: 'text.primary',
                }}
              >
                Benvenuto, {user.name}
              </Typography>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}