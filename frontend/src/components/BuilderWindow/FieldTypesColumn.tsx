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

// FORM FIELD DEFINITIONS
export const fieldTypes = [
  { id: 'text', name: 'Text', icon: TextFieldsIcon, description: 'Single line text field' },
  { id: 'textarea', name: 'Text Area', icon: NotesIcon, description: 'Multi-line text area' },
  { id: 'email', name: 'Email', icon: EmailIcon, description: 'Email field' },
  { id: 'number', name: 'Number', icon: PinIcon, description: 'Numeric field' },
  { id: 'phone', name: 'Phone', icon: LocalPhoneIcon, description: 'Phone number field' },
  { id: 'date', name: 'Date', icon: DateRangeIcon, description: 'Date selector' },
  { id: 'time', name: 'Time', icon: AccessTimeIcon, description: 'Time selector' },
  { id: 'select', name: 'Select List', icon: ListIcon, description: 'Options list' },
  { id: 'checkbox', name: 'Checkbox', icon: CheckBoxIcon, description: 'Checkbox field' },
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


