import React, { useState } from "react";
//MUI
import { Box, ButtonGroup, Typography } from "@mui/material";
// COMPONENTS
import BasicButton from "../components/UI/BasicButton";
import RegisterForm from "../components/UI/RegistrationForm";
export default function Home(){
  const [showRegisterForm, setShowRegisterForm ] = useState(false);


    return(
      
        <Box
        variant='main'
        sx={{minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          
  <Box component={'div'} sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:2, textAlign:'center'}}>

      <Typography variant="h1" sx={{color:'text.primary', }}>
Formitekt
      </Typography>

      <Typography variant="h2" sx={{color:'text.secondary' }}>
The ultimate form builder for your data management.
      </Typography>

      <ButtonGroup>
      <BasicButton
       text={'sign up'} color={'cyan.main'} textColor={'white'} onClick={() => setShowRegisterForm(true)}/>


      </ButtonGroup>
  </Box>
  {showRegisterForm && <RegisterForm />}
        
       
  
        </Box>

        
    )
}