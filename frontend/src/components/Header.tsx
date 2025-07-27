
import React, { useState } from 'react';
//MUI
import { Box, Switch, Divider, Button, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';

// REDUX

import { switchToDarkMode } from '../features/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectMode } from '../features/themeSlice';
import { selectUser, UserState } from '../features/UserSlice';
import { Logout } from '../features/UserSlice';



// COMPONENTS
import BasicButton from './UI/BasicButton';

export default function Header(){

    const [menuIconisClicked, setMenuIconisClicked] = useState(false);

    const darkModeIsOn= useSelector(selectMode)

    const dispatch = useDispatch(); 
    const User = useSelector(selectUser); 
    
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
        <>
        <Box component={'header'} sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
    

                <img src='/assets/images/logo.png' height={49} width={167}/>

            <Box component={'nav'}  className={`navigation  ${menuIconisClicked ? `open-nav` : '' }  items-center`}>

       
            {/* <BasicButton text={'home'} href={'/'}/> */}

            <ul>
                <li>
                    <a href="/">HOME</a>
                </li>
                <li>
                    <a href={`${User.id !== null ? null : '/login'} ` }>{User.id !== null ? 'LOG OUT' : 'LOGIN'}</a>
                </li>

                <li>
                    <a href="/about">ABOUT</a>
                </li>
            </ul>

            

        


            <Box  component={'span'} sx={{display:'flex'}}>

            {/* <LightModeIcon sx={{color: darkModeIsOn ? 'text.primary' : 'cyan.main' } } /> */}

            {/* <Switch  color='primary' onChange={()=> {dispatch(switchToDarkMode(!darkModeIsOn))}} /> */}

            {/* <DarkModeIcon color='primary'/> */}
            </Box>


            </Box>
            { User.id !== null  ? <Typography sx={{padding:0}}> Welcome,{User?.name}</Typography>  : null}



<Button onClick={()=> { setMenuIconisClicked(!menuIconisClicked)}}>


{/*  HAMBURGER ICON */}

<MenuIcon sx={{display: {xs:'inline-block', sm:'none'}, zIndex:1 }} />

</Button>
        </Box>
            <Divider/>
        </>
    )
}