 import * as React from 'react';
 //COMPONENTS
 import BasicButton from './UI/BasicButton';
// //MUI
 import { useMediaQuery } from '@mui/material';
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

 import { useTheme } from '@emotion/react';

export default function LeftSideBar() {

             const fieldTypes = [
              { id: 'text', name: 'Text', icon: TextFieldsIcon, description: 'Single line Text Field' },
              { id: 'textarea', name: 'Text Area', icon: NotesIcon, description: 'Multi-line text Area' },
              { id: 'email', name: 'Email', icon: EmailIcon, description: 'email Field' },
              { id: 'number', name: 'Number', icon: PinIcon, description: 'Numeric Field' },
              { id: 'phone', name: 'Telephone', icon: LocalPhoneIcon, description: 'phone Number' },
              { id: 'date', name: 'Date', icon: DateRangeIcon, description: 'Date Sellector' },
              { id: 'time', name: 'Time', icon: AccessTimeIcon, description: 'Selettore di ora' },
              { id: 'select', name: 'Drop down Menu', icon: ListIcon, description: 'Lista di opzioni' },
              { id: 'radio', name: 'Single Choice', icon: RadioButtonUncheckedIcon, description: 'Radio buttons' },
              { id: 'checkbox', name: 'Multiple', icon: ChecklistRtlIcon, description: 'Checkboxes' }
            ];
 

  return (
    <div>
    

      <Box
         component={'aside'}
        sx={{
          sx: {  bgcolor:'background.default', display:'flex', justifyContent:'center', flexDirection:{ xs: 'row', sm:'column'}, width:250, height:'100%', zIndex:0 }
        }}>
      
        
          <Typography variant="h6">Builder</Typography>
         {fieldTypes.map((field, index) => {
            const IconComponent = field.icon;
            
            return( <BasicButton text={field.name} startIcon={<IconComponent/>} key={index} textColor={'text.primary'}/>)
          })}
        
      </Box>
    </div>
  );
}

// import * as React from 'react';
// //MUI
// import { useMediaQuery } from '@mui/material';
// //ICONS
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import NotesIcon from '@mui/icons-material/Notes';
// import EmailIcon from '@mui/icons-material/Email';
// import PinIcon from '@mui/icons-material/Pin';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
// import Divider from '@mui/material/Divider';
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import TextFieldsIcon from '@mui/icons-material/TextFields';
// import ListIcon from '@mui/icons-material/List';
// import BasicButton from './UI/BasicButton';
// import { useTheme } from '@emotion/react';



// export default function PermanentDrawerLeft() {
//           const theme = useTheme();
//           const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//           const DrawerWidth = 190;
//           const topDrawerHeight = 64;

//            const fieldTypes = [
//               { id: 'text', name: 'Text', icon: TextFieldsIcon, description: 'Single line Text Field' },
//               { id: 'textarea', name: 'Text Area', icon: NotesIcon, description: 'Multi-line text Area' },
//               { id: 'email', name: 'Email', icon: EmailIcon, description: 'email Field' },
//               { id: 'number', name: 'Number', icon: PinIcon, description: 'Numeric Field' },
//               { id: 'phone', name: 'Telephone', icon: LocalPhoneIcon, description: 'phone Number' },
//               { id: 'date', name: 'Date', icon: DateRangeIcon, description: 'Date Sellector' },
//               { id: 'time', name: 'Time', icon: AccessTimeIcon, description: 'Selettore di ora' },
//               { id: 'select', name: 'Drop down Menu', icon: ListIcon, description: 'Lista di opzioni' },
//               { id: 'radio', name: 'Single Choice', icon: RadioButtonUncheckedIcon, description: 'Radio buttons' },
//               { id: 'checkbox', name: 'Multiple', icon: ChecklistRtlIcon, description: 'Checkboxes' }
//             ];
//   return (
//     <>
      
  
//       <Drawer
//         sx={{
          
//           flexShrink: 0,
          
//           height:'100%',
//           objectFit:'contain',
//           position:'absolute',
//           width:DrawerWidth,

        
        
          
          
//            '& .MuiDrawer-paper': {
             
          
//              bgcolor:(theme)=> theme.palette.background.default,
          
//            },
//         }}
//        variant='permanent'
//         anchor={'left'}>
    
      
        
//           {fieldTypes.map((field, index) => {
//             const IconComponent = field.icon;
            
//             return( <BasicButton text={field.name} startIcon={<IconComponent/>} key={index} textColor={'text.primary'}/>)
//           })}
        
      

       
//       </Drawer>

    
//           </>
//   );
// }
