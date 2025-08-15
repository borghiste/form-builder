 import React from 'react';
 import { useState } from 'react';
 import { Box, Switch, Divider, Button, Typography, ListItem, ListItemText, List, AppBar, Link } from '@mui/material';
 import MenuIcon from '@mui/icons-material/Menu';
  import LightModeIcon from '@mui/icons-material/LightMode';
 import DarkModeIcon from '@mui/icons-material/DarkMode';
 // REDUX
  import { useDispatch, useSelector } from 'react-redux';
  import { Logout } from '../features/UserSlice';
   import { selectUser, UserState } from '../features/UserSlice';
    import { switchToDarkMode } from '../features/themeSlice';

import { selectMode } from '../features/themeSlice';



import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import Menu from '@mui/material/Menu';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
export default function Header(){
  
  const userisLogged = useSelector(selectUser);
  
  const [menuIconisClicked, setMenuIconisClicked] = useState(false);
  const dispatch = useDispatch(); 
  const User = useSelector(selectUser); 
  const darkModeIsOn= useSelector(selectMode);

  const pages = [{name:'home', path: '/'}, ...(userisLogged.id  ? [{name:'logout', path:'/login', onClick: () =>{handleLogout()}}] : [{name:'login', path:'/login'}]), {name: 'forms', path: '/forms'}, {name:'about', path:'/about'}];

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };



          function handleLogout(){
        

                      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json',
                             'Accept': 'application/json'
                          }
                      })
                      .then(res => {
                     
                          return res.json()
                      })
                      .then(data => console.log(data))
                      dispatch(Logout())
                    }

    return(
        <Box component={'header'} sx={{overflow:'clip'}}>





    <AppBar position="static" sx={{bgcolor:'background.default'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        {/* <img src='/assets/images/logo.png' height={49} width={167} /> */}
        <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { md: 'flex', xs: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 650,
              letterSpacing: '.2rem',
              color: 'text.primary',
              textDecoration: 'none',
              position: 'static',
              
            }}
          >
            FormBuilder
          </Typography>
   

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
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
              sx={{ display: { xs: 'block', md: 'none'} }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography component={'a'} href={page.path} sx={{ textAlign: 'center'  }}>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
     
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                
                onClick={(e) =>{ if(page.onClick){e.preventDefault(); page.onClick()}}}
                sx={{ my: 2, display: 'block'}}
                
              >
                
                <Link href={page.path} sx={{color:'text.primary', 
                                        textDecoration:'none'}}>
                                        {page.name}
                </Link>
               
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display:'flex',alignItems:'center', justifyContent:'space-between' }}>

    
        <LightModeIcon sx={{color: darkModeIsOn ? 'text.primary' : 'cyan.main' } } /> 
            <Switch  color='primary' onChange={()=> {dispatch(switchToDarkMode(!darkModeIsOn))}} /> 
        <DarkModeIcon/>
            
            { User.id !== null  ? <Typography component={'h6'}  sx={{padding:0, textJustify:'auto', color:'text.primary'}}> Welcome,{User?.name}</Typography>  : null}

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  


        </Box>
    )
}

