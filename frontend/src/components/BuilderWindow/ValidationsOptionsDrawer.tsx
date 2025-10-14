import React, { useRef, useState } from "react";
import ValidationOptions from "./ValidationsOptions";
//redux
import { useSelector, useDispatch } from "react-redux";
import {addValidations, setFieldLabel, setFieldType} from "../../features/FieldSlice";

import { selectvalidationDrawer } from "../../features/validationDrawerSlice";
import { addField } from "../../features/formSlice";
//COMPONENTS
import BasicButton from "../UI/BasicButton";
import CustomizableDrawer from "../UI/CustomizableDrawer";
//MUI
import { Box, Drawer, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { selectField, setField } from "../../features/FieldSlice";
import { nanoid } from "@reduxjs/toolkit";




export default function ValidationsOptionsDrawer({openDrawer, 
setOpenDrawer}) {

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
    <CustomizableDrawer
    variant={'persistent'}
    anchor={ isMobile ? 'bottom': 'right'}
    openDrawer={openDrawer} 
    content={
      <>
      <Box component={'header'} sx={{display:'flex', justifyContent:'end', overflow:'auto'}}>
            <BasicButton text={'X'} size={'small'} onClick={() => {setOpenDrawer(!openDrawer)}}
           textColor={'magenta.main'}/>
           </Box>
            {/* input field label */}
            {/* change field label on redux */}
  
           <TextField size="small" inputRef={labelRef} label="inset label field name"/>
      <h3>Field Type: {fieldType}</h3>
      {/* render options based on field type  */}
      <ValidationOptions
        fieldType={fieldType}
        validations={validations}
        onChange={handleValidationChange}
        />

      <h4>chose validations:</h4>
      <p>
      {JSON.stringify(validations, null, 2)}</p>
      <Box>
        <BasicButton text={'add field'}
        onClick={() =>{handleAddField()}}/>
      </Box>
        </>
    }/>
    // <Drawer
    // sx={{position:'relative'}}
            

    //          variant="persistent"
    //          hideBackdrop
    //          ModalProps={{keepMounted: true}}
    //          PaperProps={{
    //            sx: {
    //              position:'relative',
    //              bgcolor:'background.default',
              
               
              
    //            }
    //          }}
    //           // set anchor based on viewport
    //          anchor={isMobile ? 'bottom' :"right"}
            
    //          open={openDrawer}
    //          >
    //                <Box sx={{display:'flex', justifyContent:'end', zIndex:1}}>
    //        <BasicButton text={''} size={'large'} onClick={() => {setOpenDrawer(!openDrawer)}}
    //        textColor={'magenta.main'}/>
    //        </Box>
    //         {/* input field label */}
    //         {/* change field label on redux */}
  
    //        <TextField size="small" inputRef={labelRef} label="inset label field name"/>
    //   <h3>Field Type: {fieldType}</h3>
    //   {/* render options based on field type  */}
    //   <ValidationOptions
    //     fieldType={fieldType}
    //     validations={validations}
    //     onChange={handleValidationChange}
    //   />

    //   <h4>chose validations:</h4>
    //   <p>
    //   {JSON.stringify(validations, null, 2)}</p>
    //   <Box>
    //     <BasicButton text={'add field'}
    //     onClick={() =>{handleAddField()}}/>
    //   </Box>
    
  );
}
