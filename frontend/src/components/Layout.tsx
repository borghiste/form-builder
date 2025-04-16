import React from "react";
import { useState } from "react";
// import components
import Header from "./Header";
import Footer from "./footer";

// MUI
import  Box  from "@mui/material/Box";



export default function Layout({children, mode, SetMode}){
    

    return(
     
        <Box   sx={{bgcolor: 'background.default', height:'100svh'}}>
        <Header mode={mode} setMode={SetMode}/>
        {children}
        <Footer/>
        </Box>

    )
}