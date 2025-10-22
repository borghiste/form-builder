import React, {  useState, useRef } from "react";
import ValidationOptions from "./ValidationsOptions";
//redux
import { useSelector, useDispatch } from "react-redux";
import {addValidations, setFieldLabel, setFieldType} from "../../features/FieldSlice";

import { selectvalidationDrawer } from "../../features/validationDrawerSlice";
import { addField } from "../../features/formSlice";
//COMPONENTS
import BasicButton from "../UI/BasicButton";

//MUI
import { Box, Button, TextField, Typography, Grid} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { selectField, setField } from "../../features/FieldSlice";
import { nanoid } from "@reduxjs/toolkit";

export default function ValidationsOptionsBox({openDrawer, 
  setOpenDrawer}){
    const dispatch = useDispatch();
    const [validations, setValidations] = useState<Record<string, any>>({});
    const fieldType = useSelector(selectvalidationDrawer);
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

     labelRef.current.value = '';
     setValidations({});
     setField(null); 
   };
  

   const handleValidationChange = (name: string, value: any) => {
     setValidations((prev) => ({ ...prev, [name]: value }));
   };

  return(
    <Grid>

                <Typography variant="subtitle1" fontWeight="bold">
                  Set Validations
                </Typography>


                Field Type: {fieldType}
                <TextField
                  label="Insert label field name"
                  fullWidth
                  margin="normal"
                  inputRef={labelRef}
                />

                <Typography variant="body2">
                </Typography>
                {/* render options based on field type  */}
       <ValidationOptions
         fieldType={fieldType}
         validations={validations}
         onChange={handleValidationChange}/>

                <Typography variant="body2">Choose validations:</Typography>
                <Box
                  component="pre"
                  sx={{
                    bgcolor: "grey.100",
                    p: 1,
                    borderRadius: 1,
                    fontSize: "0.8rem",
                    mb: 1,
                  }}
                >
                  {"{}"}
                </Box>

                <Button variant="outlined" size="small"
                onClick={() =>{handleAddField()}}>
                  Add Field
                </Button>
              
                </Grid>
  )
}

