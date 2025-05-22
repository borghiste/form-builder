
import React, { useState } from 'react';
//MUI
import { Box, Switch, Divider, Button, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';

// REDUX

import { switchToDarkMode } from '../../features/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectMode } from '../../features/themeSlice';
import { selectUser, UserState } from '../../features/UserSlice';
import { Logout } from '../../features/UserSlice';



// COMPONENTS
import BasicButton from '../UI/BasicButton';
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
    

                <img src='/assets/images/logo.jpg' height={75} width={75}/>

            { User.id !== null  ? <Typography sx={{padding:0}}> Welcome,{User?.name}</Typography>  : null}
            <Box component={'nav'}  className={`navigation  ${menuIconisClicked ? `open-nav` : '' }  items-center`}>

       
            <BasicButton text={'home'} href={'/'}/>
            <BasicButton text={User?.id !== null ? 'Log out' : 'Log in'} variant={'text'} href={ User.id !== null ? null : 'login'} onClick={User.id !== null ? handleLogout : null} />
            

        

            <Box  component={'span'} sx={{display:'flex'}}>

            <LightModeIcon sx={{color: darkModeIsOn ? 'text.primary' : 'cyan.main' } } />

            <Switch  color='primary' onChange={()=> {dispatch(switchToDarkMode(!darkModeIsOn))}} />

            <DarkModeIcon color='primary'/>
            </Box>
            </Box>



<Button onClick={()=> { setMenuIconisClicked(!menuIconisClicked)}}>

<MenuIcon sx={{display: {xs:'inline-block', sm:'none'} }} />

</Button>
        </Box>
            <Divider/>
        </>
    )
}