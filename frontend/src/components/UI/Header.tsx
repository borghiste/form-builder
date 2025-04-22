
import React, { useState } from 'react';
//MUI
import { Box, Switch, Divider, Button } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';

// COMPONENTS
import BasicButton from '../UI/BasicButton';
export default function Header(){

    const [menuIconisClicked, setMenuIconisClicked] = useState(false);

    return(
        <>
        <Box component={'header'} sx={{display:'flex', justifyContent:'space-between'}} className="flex items-center justify-between ">
    

                <img src='/assets/images/logo.jpg' height={75} width={75}/>

            <Box component={'nav'}  className={`navigation ${menuIconisClicked ? `open` : '' }  items-center`}>


            <BasicButton text={'home'} href={'/'}/>
            <BasicButton text={'Log in'} variant={'text'} />
            

        

            <Box  component={'span'} className='flex'>

            <LightModeIcon />

            <Switch  color='primary' />

            <DarkModeIcon color='text.primary'/>
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