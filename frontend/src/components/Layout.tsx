import React from 'react';
import { Box } from '@mui/material';


// COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Layout({children}){

    return(
        <Box   sx={{bgcolor: 'background.default', height:'100'}}>
        <Header/>
        {children}
        <Footer/>
        </Box>
    )
}