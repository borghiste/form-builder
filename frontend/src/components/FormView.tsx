import React, { use, useEffect } from "react";
import { useState } from "react";
//COMPONENTS
import BasicButton from './UI/BasicButton';
//REDUX

import { useDispatch, useSelector } from "react-redux";
import { selectList } from "../features/formsListSlice";
import { selectForm } from '../features/formSlice';
import { selectStatus } from "../features/formSlice";

import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  Divider,
  Chip,
  TextareaAutosize
} from "@mui/material";
import { RootState } from "../app/store";

const renderedComponent = {
  text: (props) => <TextField type="text" {...props}/>,
  textarea: (props) => <TextareaAutosize {...props}/>,
  email: (props) => <TextField type="email" {...props}/>,
  number: (props) => <TextField type="number" {...props}/>,
  phone: (props) => <TextField type="tel" {...props}/>,
  password: (props) => <TextField type="password" {...props}/>,
  date: (props) => <TextField type="date" {...props}/>,
  time: (props) => <TextField type="time" {...props}/>,
  selectList: (props) => (
    <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>
  )
}


export default function FormView({disabledFields}) {

  const dispatch = useDispatch();

  
  const form = useSelector(selectForm);
  
  const status = useSelector(selectStatus)
  

  return (

  <>

      <Paper sx={{ p: 4, borderRadius: 3 }} elevation={3}>
        <Typography variant="h5" component="h1" gutterBottom>
          {form?.name}
        </Typography>

        <Box component="form"  noValidate>
          <Grid container spacing={2}>
          {
            form?.form_fields?.map((field) => {
              console.log(field.type)
             
          const Component = renderedComponent[field.type];
          return ( <Component label={field.label} disabled={disabledFields}/>)
            })
          }
      
            {/* <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
               
                
                
                autoComplete="email"
              />
            </Grid> */}

       

            {/* <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="role-label">Ruolo</InputLabel>
                <Select
                  labelId="role-label"
                  label="Ruolo"
               
                 
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="guest">Guest</MenuItem>
                </Select>
              
              </FormControl>
            </Grid> */}

          

           
       
          </Grid> 
        </Box>
      </Paper>
   
 



  </>

  )
}
