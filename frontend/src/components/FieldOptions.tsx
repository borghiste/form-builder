import * as React from 'react';
import { useState } from 'react';
//COMPONENTS
import LabeledSelection from './UI/LabeledSelection';
//MUI
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';



import BasicButton from '../components/UI/BasicButton';


//THIS COMPONENT CONTAIN FIELD'S OPTIONS AND CUSTOMIZABLE VSLIDATIONS

export default function FieldOptions({open, setOpen}) {
  

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // const DrawerList = (
  //   <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
  //     <List>
  //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // );

  const fieldTypes = ['text', 'number', 'date', 'telephone', 'radio button', 'email', 'switch button', 'select', 'radio button']

  return (
    <>
     
      <Drawer open={open} anchor='right' onClose={toggleDrawer(false)} sx={{zIndex:2}} ModalProps={{keepMounted:true}}>
        <Box sx={{width:250}}>

        <LabeledSelection options={fieldTypes}
                          labelName={'select field type '}/>
          
        
        <BasicButton text={'add field'} color={'cyan.main'} textColor={'white'}/>
        </Box>
      </Drawer>
    </>
  );
}
