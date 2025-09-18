 import * as React from 'react';
 //COMPONENTS
 import BasicButton from '../UI/BasicButton';
// //MUI
 import { useMediaQuery } from '@mui/material';
 import Button from '@mui/material';
// //ICONS
 import Box from '@mui/material/Box';
 import Drawer from '@mui/material/Drawer';
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
 //redux
 import { useDispatch } from 'react-redux';
 import { setvalidationsField } from '../../features/validationDrawerSlice';



 export const fieldTypes = [
  { id: 'text', name: 'text', icon: TextFieldsIcon, description: 'Single line Text Field' },
  { id: 'textarea', name: 'text Area', icon: NotesIcon, description: 'Multi-line text Area' },
  { id: 'email', name: 'Email', icon: EmailIcon, description: 'email Field' },
  { id: 'number', name: 'Number', icon: PinIcon, description: 'Numeric Field' },
  { id: 'phone', name: 'Telephone', icon: LocalPhoneIcon, description: 'phone Number' },
  { id: 'date', name: 'Date', icon: DateRangeIcon, description: 'Date Selector' },
  { id: 'time', name: 'Time', icon: AccessTimeIcon, description: 'hour Selector ' },
  { id: 'select', name: 'Select List', icon: ListIcon, description: 'options list' },
  
  { id: 'checkbox', name: 'checkbox', icon: ChecklistRtlIcon, description: 'Checkboxes' }

];
// export default function LeftSideBar({setValidationsDrawer}) {

//   const dispatch = useDispatch();

//   const handleFieldButtonClick = (fieldType) => {
//     setValidationsDrawer(true);
//     dispatch(setvalidationsField(fieldType));
   

//   }


 

//   return (
   
    

//       <Box
//          component={'aside'}
//         sx={{
//              bgcolor:'background.default',
            
        
          

//               display:'flex',
//               flexWrap:'wrap', 
//               maxWidth:{xs:'100%', sm:250},
//         }}>
      
        
//           {/* <Typography variant="h6" >Form Fields</Typography> */}
//          {fieldTypes.map((field, index) => {
//             const IconComponent = field.icon;
            
//             return( 
//                   <BasicButton text={field.name}
//                               variant={'outlined'}
//                                 size={'small'}
//                                 startIcon={<IconComponent />}
//                                 key={index} textColor={'text.primary'}
//                                 onClick={() => {handleFieldButtonClick(field.name)}}/>)
//           })}
        
//       </Box>
    
//   );
// }


// export default function SideBar({setValidationsDrawer}) {
//   return (
//     <Box
//       component={'aside'}
//       >
//         bar
//       </Box>
//   )
// }

import React from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import NotesIcon from "@mui/icons-material/Notes";
import EmailIcon from "@mui/icons-material/Email";
import NumbersIcon from "@mui/icons-material/Numbers";
import PhoneIcon from "@mui/icons-material/Phone";
import EventIcon from "@mui/icons-material/Event";



const FieldButton = ({ label, icon, onClick }) => (
  <BasicButton
    variant="outlined"
    startIcon={icon}
   
    size="small"
    fullWidth
    text={label}
    sx={{ justifyContent: "flex-start", mb: 0.5 }}
    onClick={onClick}/>
  
);

export default function Sidebar({setValidationsDrawer}) {

  const handleFieldButtonClick = (fieldType) => {
         setValidationsDrawer(true);
         dispatch(setvalidationsField(fieldType));
  }


  return (
    <Box
      sx={{
        width: 280,
        display: "flex",
       p:4,
        borderRight: "1px solid #ddd",
        backgroundColor: "#fff",
        height: "100%",
        bgcolor: 'background.default',
      }}
      component={'aside'}
      flexWrap={'wrap'}
      flexDirection={'row'}
      gap={1}
      
    >
      {/* Header */}
      <Typography variant="h6" color='text.primary' fontSize={18}>
        Form Builder
      </Typography>
      

      <Divider sx={{ mb: 2 }} />

      {/* Lista campi */}

      {fieldTypes.map((field) =>{
        const IconComponent = field.icon;
      
        return (

          <FieldButton
            key={field.id}
            overflow={'auto'}
            label={field.name}
            icon={<IconComponent/>}
            onClick={() => handleFieldButtonClick(field.name)}
            
        />)
      })
    }



    
    </Box>  );
}