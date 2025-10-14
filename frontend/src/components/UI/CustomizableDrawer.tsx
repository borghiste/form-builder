import React, { useRef, useState } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import {addValidations, setFieldLabel, setFieldType} from "../../features/FieldSlice";

import { selectvalidationDrawer } from "../../features/validationDrawerSlice";
import { addField } from "../../features/formSlice";
//COMPONENTS
import BasicButton from "./BasicButton";
//MUI
import { Box, Drawer, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { selectField, setField } from "../../features/FieldSlice";
import { nanoid } from "@reduxjs/toolkit";




export default function CustomizableDrawer({openDrawer, 
setOpenDrawer,
variant,
anchor,
content}) {

const dispatch = useDispatch();
const theme = useTheme();
  const fieldType = useSelector(selectvalidationDrawer);
  const field = useSelector(selectField);
 
  
  


  const [validations, setValidations] = useState<Record<string, any>>({});
  const isMobile =useMediaQuery(theme.breakpoints.down('sm'))
  const labelRef = useRef('');
  

  const handleAddField = () => {
    if (!fieldType || !labelRef.current.value) return;
  
    const newField = {
      id: nanoid(),
      type: fieldType,
      label: labelRef.current.value,
      validations: { ...validations }, 
    };
  
    dispatch(addField(newField));
    console.log('Field added:', newField);
  
   
    labelRef.current.value = '';
    setValidations({});
    setField(null); 
  };
  

  const handleValidationChange = (name: string, value: any) => {
    setValidations((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Drawer
    sx={{position:'relative', display:'flex', justifyContent:'center'}}
            

             variant={variant}
             hideBackdrop
             ModalProps={{keepMounted: true}}
             PaperProps={{
               sx: {
                 display:'flex',
                 justifyContent:'center',
                 position:'relative',
                 bgcolor:'background.default',
                 border:'1px, solid black',
                 overflow:'auto',
                 maxWidth:'100%',
                 
                 
              
               
              
               }
             }}
              // set anchor based on viewport
             anchor={anchor}
            
             open={openDrawer}
             > 
     {content}
    </Drawer>
  );
}
