import React from "react";

//redux
import { useDispatch } from 'react-redux';
import { setvalidationsField } from '../../features/validationDrawerSlice';
import {setFieldType} from '../../features/FieldSlice';
//MUI
import { Box, Grid } from "@mui/material";

// //ICONS

import Typography from '@mui/material/Typography';
import NotesIcon from '@mui/icons-material/Notes';
import EmailIcon from '@mui/icons-material/Email';
import PinIcon from '@mui/icons-material/Pin';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ListIcon from '@mui/icons-material/List';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

//COMPONENTS
import BasicButton from "../UI/BasicButton";
import FieldButton from '../UI/FieldButton';

// DATA TYPES
export const fieldTypes = [
    { id: 'text', name: 'text', icon: TextFieldsIcon, description: 'Single line Text Field' },
    { id: 'textarea', name: 'text Area', icon: NotesIcon, description: 'Multi-line text Area' },
    { id: 'email', name: 'email', icon: EmailIcon, description: 'email Field' },
    { id: 'number', name: 'number', icon: PinIcon, description: 'Numeric Field' },
    { id: 'phone', name: 'telephone', icon: LocalPhoneIcon, description: 'phone Number' },
    { id: 'date', name: 'date', icon: DateRangeIcon, description: 'Date Selector' },
    { id: 'time', name: 'time', icon: AccessTimeIcon, description: 'hour Selector ' },
    { id: 'select', name: 'select List', icon: ListIcon, description: 'options list' },

    { id: 'checkbox', name: 'checkbox', icon: CheckBoxIcon, description: 'Checkbox' }
  
  ];



export default function FieldTypesDrawer({setValidationsDrawer, openDrawer}){
  const dispatch = useDispatch();
  
  const handleFieldButtonClick = (fieldType) => {
         setValidationsDrawer(true);
         dispatch(setvalidationsField(fieldType));
         dispatch(setFieldType(fieldType));
         console.log('field type set to:', fieldType);
  }

  return(

    <Grid container direction={'column'} alignItems={'center'} >
    <nav>
      <Typography variant="subtitle1" fontWeight="bold" mb={1} color="text.primary">
        Select a Field Type
      </Typography>
      <Box display="flex" flexDirection="column"  justifyContent={'center'}  >
        {fieldTypes.map((field) =>{
           const IconComponent = field.icon;
       
           return (

             

             <FieldButton
             key={field.id}
            
             label={field.name}
             icon={<IconComponent/>}
            onClick={() => handleFieldButtonClick(field.name)}/>
           )
         })}
      
      </Box>
    </nav>

    
  </Grid>
  )
 }
         
    
    
    
 