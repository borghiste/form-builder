import React from "react";
import { Container, Paper, Box, Typography, TextField, InputLabel, FormControl, Button } from "@mui/material"
import BasicButton from "./BasicButton";
export default function LoginPage(){

return(
<Container maxWidth='sm'>

<Paper sx={{bgcolor:'background.default',p:4, mt:8}}>

<Typography variant="h5" align="center" gutterBottom sx={{color:'text.primary'}}>Login</Typography>
<Box component={'form'}>

  
<InputLabel>email:</InputLabel>
<TextField label="email" fullWidth margin="normal" sx={{minHeight:'1rem'}}/>

<InputLabel sx={{mt:4}}>Password:</InputLabel>
<TextField label="password" fullWidth margin="normal" sx={{minHeight:'1rem'}}/>

  

  <BasicButton text='submit' variant="contained" fullWidth={true}/>
   
</Box>

</Paper>

</Container>
)
}