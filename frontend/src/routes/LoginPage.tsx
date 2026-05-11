import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { Container, Paper, Box, Typography, TextField, InputLabel, FormHelperText } from "@mui/material";
import BasicButton from "../components/UI/BasicButton";

import { useAuthentication } from '../stores/useAuthStore';


//THIS COMPONENT CONTAINS LOGIN PAGE AND ITS LOGIC



export default function LoginPage(){



  const {email, password, loginUser, setField} = useAuthentication();
  const navigate = useNavigate();
  
 

  const [HelperText, setHelperText] = useState('');


async function handleLogin(e) {
    e.preventDefault();
   
  
  
     if (email === '' || password === '') {
       setHelperText('email and password are required');
       return;
     }

     try {
       const response = await loginUser();



 
     

      

     

       navigate(`/${response.organization.subdomain}/forms`);
     } catch (error) {
       const message = error instanceof Error ? error.message : 'Login failed';
       setHelperText(message);
     }

    }
  

return(
  <>

  
<Container maxWidth='sm' sx={{height:'100vh'}}>

<Paper sx={{bgcolor:'background.default',p:4, mt:8}} elevation={8}>

<Typography variant="h5" align="center" gutterBottom sx={{color:'text.primary'}}>Login</Typography>
<Box component={'form'} role="login" onSubmit={handleLogin}>

  
<InputLabel >email:</InputLabel>
<TextField label="email"  fullWidth margin="normal" sx={{minHeight:'1rem'}} id="email" name="email" role="email" required  onChange={(e)=>{setField('email', e.target.value)}}  inputProps={{'data-testid': 'email-input'}}/>

<InputLabel sx={{mt:4}}>Password:</InputLabel>
<TextField label="password" fullWidth margin="normal" type="password" sx={{minHeight:'1rem'}} id="password" name="password" required onChange={(e)=>{setField('password', e.target.value)}} inputProps={{'data-testid': 'password-input'}}/>

  

  <BasicButton text='Log in' variant="contained" fullWidth={true} type={'submit'} />
  <FormHelperText sx={{color:'red'}}>{HelperText}</FormHelperText>
</Box>

</Paper>
 

</Container>
  </>
)
}
