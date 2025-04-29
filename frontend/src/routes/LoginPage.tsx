import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Container, Paper, Box, Typography, TextField, InputLabel, FormControl, Button } from "@mui/material";
import BasicButton from "../components/UI/BasicButton";

//THIS COMPONENT CONTAINS LOGIN PAGE AND ITS LOGIC




export default function LoginPage(){

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  function handleSubmit(e) {
    e.preventDefault();
  
    fetch('http://localhost:8000/api/login', {
      method: 'POST', 
    
      headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        
      },
     
      body: JSON.stringify({ 
        
        email: email,
        password: password
      })
    })
    .then(res => {
      if (res.ok) {

        return res.json();
        

      } else {
        throw new Error('Errore nella risposta: ' + res.status);
      }
    })
    .then((data) => { setUser(data.user);
      navigate('/forms')
              
  })
  
    .catch(error => console.error('Errore nella fetch', error));
  }
  
   


return(
  <>

  
<Container maxWidth='sm' sx={{height:'100vh'}}>

<Paper sx={{bgcolor:'background.default',p:4, mt:8}} elevation={8}>

<Typography variant="h5" align="center" gutterBottom sx={{color:'text.primary'}}>Login</Typography>
<Box component={'form'}  onSubmit={handleSubmit}>

  
<InputLabel>email:</InputLabel>
<TextField label="email" fullWidth margin="normal" sx={{minHeight:'1rem'}} id="email" name="email" onChange={(e)=>{setEmail(e.target.value)}}/>

<InputLabel sx={{mt:4}}>Password:</InputLabel>
<TextField label="password" fullWidth margin="normal" type="password" sx={{minHeight:'1rem'}} id="password" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>

  

  <BasicButton text='submit' variant="contained" fullWidth={true} type={'submit'}/>

   
</Box>

</Paper>

</Container>
  </>
)
}