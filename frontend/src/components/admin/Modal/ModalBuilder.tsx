import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddFieldsPanel from '../Modal/AddFieldsPanel';
import Preview from '../Modal/Preview';
//MUI

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Stack, Container } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  

  bgcolor: 'background.paper',
 paddingTop: 8,
  boxShadow: 24,
  display:'flex',
  overflow:'clip',
  justifyContent:'center',
  flexDirection: 'column',
  maxHeigth: 800,
  
  
  
};

export default function ModalBuilder({open, setOpen}) {

  const navigate = useNavigate();

  return (
    <div>
      
      <Modal
        onClose={()=>{setOpen(false); navigate('/login/forms')}}
        open={open}
        
        open={true}
        sx={{ display:'flex', minHeight:400, overflow:'scroll'}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style}>
          <Typography id="-modal-title" variant="h3" component="h3">
            Edit Form
          </Typography>
          <Divider/>
        <Stack direction={'vertical'} className='sm:flex-row flex-col '>
    <AddFieldsPanel/>
    
    <Divider orientation='vertical'  flexItem={true}/>
        <Preview/>
    
        </Stack>
        </Container>
      </Modal>
    </div>
  );
}
