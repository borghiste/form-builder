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
  date: (props) => <TextField type="date" InputLabelProps={{ shrink: true }}  {...props}/>,
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
    <MenuItem value={10}></MenuItem>
    <MenuItem value={20}></MenuItem>
    <MenuItem value={30}></MenuItem>
  </Select>
</FormControl>
  ),
  checkbox: (props) => (<FormControlLabel control={<Checkbox label={props.label}/>} {...props}/>)
}


export default function FormView({disabledFields}) {

  const dispatch = useDispatch();

  
  const form = useSelector(selectForm);
  
  const status = useSelector(selectStatus)
  

  return (

  <>

      <Paper sx={{ p: 4, borderRadius: 3,display:'flex', flexDirection:'column'}}  elevation={3}>
        <Typography variant="h5" component="h1" gutterBottom>
          {form?.name}
        </Typography>

        <Typography>
          {form?.description || 'No description provided.'}
        </Typography>

        <Box component="form"  noValidate>
          <Grid container spacing={2} sx={{display:'flex', flexDirection:'column'}}>
          {
            form?.form_fields?.map((field) => {
            
             
          const Component = renderedComponent[field.type];
          return ( <Component label={field.label} disabled={disabledFields}/>)
            })
          }
      
        

          

           
       
          </Grid> 
        </Box>
      </Paper>
   
 



  </>

  )
}
