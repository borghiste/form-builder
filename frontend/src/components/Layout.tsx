import React from 'react';
import { Box } from '@mui/material';


// COMPONENTS
import Header from './UI/Header';
export default function Layout({children}){

    return(
        <Box   sx={{bgcolor: 'background.default', height:'100svh'}}>
        <Header/>
        {children}
        <footer/>
        </Box>
    )
}