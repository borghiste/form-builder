import React from 'react';
import { Box } from '@mui/material';


// COMPONENTS
import Header from './UI/Header';
import Footer from './UI/Footer';
export default function Layout({children}){

    return(
        <Box   sx={{bgcolor: 'background.default', height:'100'}}>
        <Header/>
        {children}
        <Footer/>
        </Box>
    )
}