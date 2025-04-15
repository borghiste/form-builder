import { useState } from 'react';
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
  
  heigth: 800,
  bgcolor: 'background.paper',
 paddingTop: 8,
  boxShadow: 24,
  display:'flex',
  overflow:'clip',
  justifyContent:'center',
  flexDirection: 'column'
  
  
};

export default function ModalBuilder() {



  return (
    <div>
      
      <Modal
        
        open={true}
        sx={{ display:'flex'}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style}>
          <Typography id="-modal-title" variant="h6" component="h2">
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
