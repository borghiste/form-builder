import React from 'react';
// MUI
import { Box, Typography } from '@mui/material';
// COMPONENTS
import FieldButton from '../UI/FieldButton';
// ICONS
import NotesIcon from '@mui/icons-material/Notes';
import EmailIcon from '@mui/icons-material/Email';
import PinIcon from '@mui/icons-material/Pin';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ListIcon from '@mui/icons-material/List';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PasswordIcon from '@mui/icons-material/Password';
// FORM FIELD DEFINITIONS
export const fieldTypes = [
  { name: 'text', type:'text', 
     icon: TextFieldsIcon, 
     description: 'Single line text field'
   },
   { name: 'text area', type: 'text area', icon: NotesIcon, description: 'Multi-line text area' },
   { name: 'email', type:'email', icon: EmailIcon, description: 'Email field' },
   { name: 'number', type:'number', icon: PinIcon, description: 'Numeric field' },
   { name: 'phone', type:'phone', icon: LocalPhoneIcon, description: 'Phone number field' },
   { name: 'password', type:'password', icon:PasswordIcon},
   { name: 'date', type:'date', icon: DateRangeIcon, description: 'Date selector' },
   { name: 'time', type:'time', icon: AccessTimeIcon, description: 'Time selector' },
   {  name: 'select list', type:'select list', icon: ListIcon, description: 'Options list' },
   {  name: 'checkbox', type:'checkbox', icon: CheckBoxIcon, description: 'Checkbox field' },
];

;

export default function FieldTypesColumn({handleDragStart}) {
    
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontSize: '1.125rem',
          fontWeight: 600,
          mb: 2,
          
        }}
      >
        Form Fields
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
       
        {fieldTypes?.map((field) => {
        

          return (
            <FieldButton key={field.id} 
            Icon={field.icon} 
            name={field.name} 
            handleDragStart={handleDragStart}
            field={field}/>
        
          );
        })
        }
      </Box>
    </Box>
  );
}


