import React, {use, useEffect, useRef, useState} from "react";

//MUI

import {
  Box,
  Button,
  TextField,
  Checkbox,

  Typography,
  Divider,
  Grid,
  Paper,
  Tabs,
  Tab,
  ButtonGroup,
} from "@mui/material";
//COMPONENTS
import ValidationsOptionsBox from "./ValidationsOptionsBox";

import FormView from "../FormView";
import FieldTypesDrawer from "./FieldTypesDrawer";

import BasicButton from "../UI/BasicButton";


//REDUX
import { selectForm } from "../../features/formSlice";
import { useSelector, useDispatch } from "react-redux";
import FormFieldList from '../BuilderWindow/FormFieldList';
import {createForm, setFormName, setFields} from "../../features/formSlice";
import {createNewForm} from "../../features/formsListSlice";
import { AppDispatch } from "../../app/store";
import { nanoid } from "@reduxjs/toolkit";




export default function BuilderSection() {
  const [validationsDrawer, setValidationsDrawer] = useState(false);
  const form = useSelector(selectForm);
  const dispatch = useDispatch<AppDispatch>();
  const formNameRef = useRef<HTMLInputElement | null>(null);
 

  function handleCreateNewForm(){
    if(!form) return;
    
    dispatch(createNewForm({
      id:nanoid(),
      name: form.name,
      fields: form.fields
    }));
    
  }
  

  return (
    <Box component={'main'} >
      
      <Paper elevation={3} sx={{ backgroundColor: 'background.default'
       }}>
        
        <TextField
          label="insert Form Name"
           onChange={(e) => {

               e.preventDefault(); 
               
               dispatch(setFormName(formNameRef.current?.value));
               }}

           defaultValue={form?.name}
          inputRef={formNameRef}
          
          margin="normal"
          fullWidth/>
          
          <Typography >Form name:
  {form?.name}
</Typography>


          
        <Divider sx={{ my: 2 }} />

        
       
        
        

        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',
        
        
      }}>
          <Grid container sx={{flexDirection:{xs:'column', md:'row'}}}>
            {/*left  Sidebar  */}
            <FieldTypesDrawer setValidationsDrawer={setValidationsDrawer}/>

            {/*  central area */}
            <FormFieldList/>
           

            {/* Right Pannel */}
            <ValidationsOptionsBox openDrawer={validationsDrawer} setOpenDrawer={setValidationsDrawer}/>
          </Grid>
        </Box>
          <ButtonGroup>
            <Button onClick={() => {handleCreateNewForm()}}>save</Button>
          </ButtonGroup>
      </Paper>
    </Box>
  );
}


