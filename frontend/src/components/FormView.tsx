import React from "react";

//COMPONENTS
import BasicButton from './UI/BasicButton';
//REDUX

import { useDispatch, useSelector } from "react-redux";
import { selectForm } from '../features/formSlice';
import {submitFormEntry} from '../features/FormEntriesSlice';


import {
  TextField,
  
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  TextareaAutosize
} from "@mui/material";


interface Field {
  id: string;
  name: string;
  type: string;
  required?: boolean;
  options?: string[];
}

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
    // onChange={handleChange}
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Submitting form...');
      const resultAction = await dispatch(submitFormEntry());
  
      if (submitFormEntry.fulfilled.match(resultAction)) {
        console.log('Form submitted successfully:', resultAction.payload);
      } else {
        console.error('Form submission failed:', resultAction.error);
      }
  
    } catch (err) {
      console.error('Unexpected error during submission:', err);
    }
  };
  

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   console.log("Submitting dynamic form:", formData);

  //   try {
  //     const res = await fetch("http://localhost:8000/api/forms/submit", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!res.ok) throw new Error("Errore durante il submit");

  //     console.log("Form submitted  successfully!");
  //   } catch (err) {
  //     console.error("Submit error:", err);
  //   }
  // };

  

  return (

  <>

      <Paper
      sx={{ p: 4, borderRadius: 3,display:'flex', flexDirection:'column', backgroundColor: 'background.default'}}  elevation={3}
      onSubmit={handleSubmit}>
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
          {/* submit button */}
          <BasicButton text={'submit'}
          type={'submit'}
          color={'cyan.main'} textColor={'white'}/>
          {/* reset button */}
          <BasicButton text={'reset'} variant={'outlined'}/>


      
        

          

           
       
          </Grid> 
        </Box>
      </Paper>
   
 



  </>

  )
}
