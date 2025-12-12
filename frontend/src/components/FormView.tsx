import React from "react";

//COMPONENTS
import BasicButton from './UI/BasicButton';
//REDUX

import { useDispatch, useSelector } from "react-redux";
import { selectForm } from '../features/formSlice';
// import {submitFormEntry} from '../features/FormEntriesSlice';


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

const formFields = [
  { id: "name", label: "Name", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "message", label: "Message", type: "textarea" },
  { id: "newsletter", label: "Subscribe to newsletter", type: "checkbox" },
  { id: "gender", label: "Gender", type: "selectList", options: ["Male", "Female", "Other"] }
];

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


export default function FormView({disabledFields, entries}) {
  


  const dispatch = useDispatch();
  const form = useSelector(selectForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    
  
    try {
      const resultAction = await dispatch(
        submitFormEntry({
          form_id: 9,
          data: {
            name: "stefano",
            email: "test@test.com",
          },
        })
      );
  
      if (submitFormEntry.fulfilled.match(resultAction)) {
        console.log("Form submitted successfully:", resultAction.payload);
      } else {
        console.error("Form submission failed:", resultAction.error);
      }
    } catch (err) {
      console.error("Unexpected error during submission:", err);
    }
  };
  

  return (

  <>
  {/* FORM */}
      <Paper
      sx={{ p: 4, borderRadius: 3,display:'flex', flexDirection:'column', backgroundColor: 'background.default'}}  elevation={3}
      >
        <Box>
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
        

        {/* ENTRIES */}
      <Box>
        <Typography variant="h6" gutterBottom>Previous Entries</Typography>
        {entries?.map(entry => (
          <Paper key={entry.id} sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={1}>
              {formFields.map(field => (
                <Grid item xs={12} sm={6} key={field.id}>
                  <Typography variant="subtitle2">{field.label}:</Typography>
                  <Typography>
                    {field.type === "checkbox"
                      ? entry.data[field.id] ? "Yes" : "No"
                      : entry.data[field.id]}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            
          </Paper>
          
        ))}
      </Box>
      </Box>
      </Paper>
   
 



  </>

  )
}
