import React from "react";

//redux
import { useDispatch } from 'react-redux';
import { setvalidationsField } from '../../features/validationDrawerSlice';
import {setFieldType} from '../../features/FieldSlice';
//MUI
import { Box, Divider } from "@mui/material";

// //ICONS


import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import NotesIcon from '@mui/icons-material/Notes';
import EmailIcon from '@mui/icons-material/Email';
import PinIcon from '@mui/icons-material/Pin';
import ListItemIcon from '@mui/material/ListItemIcon';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Divider from '@mui/material/Divider';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ListIcon from '@mui/icons-material/List';
import CheckIcon from '@mui/icons-material/Check';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

//COMPONENTS
import BasicButton from "../UI/BasicButton";
import CustomizableDrawer from "../UI/CustomizableDrawer";

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
    
    { id: 'checkbox', name: 'checkbox', icon: ChecklistRtlIcon, description: 'Checkboxes' }
  
  ];



const FieldButton = ({ label, icon, onClick }) => (
  <BasicButton
    variant="outlined"
    startIcon={icon}
   
    size="small"
    
    text={label}
    sx={{ justifyContent: "flex-start", mb: 0.5 }}
    onClick={onClick}/>
  
);


export default function FieldTypesDrawer({setValidationsDrawer}){
  const dispatch = useDispatch();
  
  const handleFieldButtonClick = (fieldType) => {
         setValidationsDrawer(true);
         dispatch(setvalidationsField(fieldType));
         dispatch(setFieldType(fieldType));
         console.log('field type set to:', fieldType);
  }

    return(
      <>
      
      <CustomizableDrawer openDrawer={true} variant={'persistent'} setOpenDrawer={setValidationsDrawer}
      /* Field types list */
      
          content={
          
        fieldTypes.map((field) =>{
          const IconComponent = field.icon;
       
          return (

             

            <FieldButton
            key={field.id}
            
            label={field.name}
            icon={<IconComponent/>}
            onClick={() => handleFieldButtonClick(field.name)}/>
          )
        })}/>
       
      
         
            

        
          
          
    
           <Divider sx={{ mb: 2 }} />
    
           
        
    
       
             
             
             
       
            </>
           )
           }
         
    
    
    
 