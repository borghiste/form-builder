import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Container, Paper, Box, Typography, TextField, InputLabel, FormControl, Button, FormHelperText } from "@mui/material";
import BasicButton from "../components/UI/BasicButton";

import { Login } from "../features/UserSlice";
import { useDispatch, UseDispatch, useSelector, Provider } from "react-redux";
import { UserState, selectUser  } from "../features/UserSlice";
import { Store } from "@reduxjs/toolkit";

//THIS COMPONENT CONTAINS LOGIN PAGE AND ITS LOGIC




export default function LoginPage(){
const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const User = useSelector(selectUser) ;
 
  const [HelperText, setHelperText] = useState('');




  function handleSubmit(e) {
    e.preventDefault();
   
  
  
     if (email === '' || password === '') {
       setHelperText('email and password are required');
       return;
     }
  
    fetch(`http://localhost:8000/api/login`, {
      method: 'POST',
      
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password}),
     
    })
   .then(res =>{
    
    if(!res.ok){
      return res.json().then(err => {
        console.log(err)
        throw new Error( err ||'login failed')})
    }
    return res.json()
  })
   .then(data => {
   
    if(data.user){
      dispatch(Login(data.user))
     sessionStorage.setItem('user', JSON.stringify(data.user))
   

    
    navigate('/forms', {state: {isAdmin: User.role == 'user' ? false : true } });
    
    
   }
   else 
   setHelperText(data.message)
   
  
   }
  
  )
  .catch(error => { setHelperText(error.message);

  })
  }
  
  
   


return(
  <>

  
<Container maxWidth='sm' sx={{height:'100vh'}}>

<Paper sx={{bgcolor:'background.default',p:4, mt:8}} elevation={8}>

<Typography variant="h5" align="center" gutterBottom sx={{color:'text.primary'}}>Login</Typography>
<Box component={'form'} role="form" onSubmit={handleSubmit}>

  
<InputLabel >email:</InputLabel>
<TextField label="email"  fullWidth margin="normal" sx={{minHeight:'1rem'}} id="email" name="email" role="email"  onChange={(e)=>{setEmail(e.target.value)}}  inputProps={{'data-testid': 'email-input'}}/>

<InputLabel sx={{mt:4}}>Password:</InputLabel>
<TextField label="password" fullWidth margin="normal" type="password" sx={{minHeight:'1rem'}} id="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} inputProps={{'data-testid': 'password-input'}}/>

  

  <BasicButton text='submit' variant="contained" fullWidth={true} type={'submit'} />
  <FormHelperText sx={{color:'red'}}>{HelperText}</FormHelperText>
</Box>

</Paper>
 

</Container>
  </>
)
}