import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useMediaQuery } from '@mui/material';
import BasicButton from './UI/BasicButton';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { addField, selectForm } from '../features/formSlice';


//data
import { fieldTypes } from './LeftSideBar';




export default function RightSideDrawer({openDrawer, setOpenDrawer}) {
  const theme = useTheme()
  const dispatch = useDispatch();
  const form = useSelector(selectForm);
 

  const isMobile =useMediaQuery(theme.breakpoints.down('sm'))

  const handleAddField = () => {
    dispatch(addField({type:'text', label:'new field'}))
    
  }

  return (
    <>
  

      <Drawer
        sx={{
            position:'relative'
         
        }}
        
      
        variant="persistent"
        hideBackdrop
        ModalProps={{keepMounted: true}}
        PaperProps={{
          sx: {
            position:'relative',
            bgcolor:'background.default',
           
          
          }
        }}
        anchor={isMobile ? 'bottom' :"right"}
        
        open={openDrawer}
        >
          <Box sx={{display:'flex', justifyContent:'end', zIndex:1}}>
          <BasicButton text={'x'} onClick={() => {setOpenDrawer(!openDrawer)}}
          textColor={'magenta.main'}/>
          </Box>
       
        
        
        <Divider />
        
   
            

            <Typography>validations</Typography>
            <Typography>validations</Typography>
            <Typography>validations</Typography>
            <Typography>validations</Typography>
            <Typography>validations</Typography>


        <Divider />
        <BasicButton text={'+ add field'} size={'small'}
        onClick={() => {handleAddField()}}/>
      
      </Drawer>
     
        
          </>

      
  );
}
