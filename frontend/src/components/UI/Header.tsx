
import React from 'react';
//MUI
import { Box, Switch, Divider } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

// COMPONENTS
import BasicButton from '../UI/BasicButton';
export default function Header(){

    return(
        <>
        <Box component={'header'} sx={{display:'flex', justifyContent:'space-between'}} className="flex items-center justify-between">
    

                <img src='/assets/images/logo.jpg' height={75} width={75}/>

            <Box component={'nav'} display={'flex'} sx={{ display:'inline-block'}} >


            <BasicButton text={'home'} href={'/'}/>
            <BasicButton text={'Log in'} variant={'text'} />
            

        

            </Box>

            <Box  component={'span'} className='flex'>

            <LightModeIcon />

            <Switch  color='primary' />

            <DarkModeIcon color='text.primary'/>
            </Box>

        </Box>
            <Divider/>
        </>
    )
}