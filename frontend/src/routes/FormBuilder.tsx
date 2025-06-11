import React, { useRef, useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BasicButton from "../components/UI/BasicButton";
import FieldOptions from "../components/FieldOptions";
import LabeledTextField from "../components/UI/LabeledTextField";
//REDUX
import { addNewForm } from "../features/formsListSlice";
import { useDispatch, UseDispatch } from "react-redux";
//MUI
import { Stack, Divider } from "@mui/material";

export default function FormBuilder({modalIsOpen, handleModalClose}){
  const dispatch = useDispatch();

    const modalStyle = {
      
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.default',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
     
    };

  
  const [openAddField, setOpenAddField] = useState(true);

  const [formName, setFormName] = useState('');
  const description = 'description'



  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenAddField(newOpen);
  };

  //fetch endpoint to add a new form
  function insertNewForm(){
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/new`, 
      { method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({name: formName,
                              description: description
        })
      }
    )
    .then(
      
    res => {
      if(!res.ok){
      return res.json().then(err => console.log('err',err))
    } 
     
    return res.json();

  })
   dispatch(addNewForm())

  }


    
    return(
    

            <>
              
              <Modal
                open={modalIsOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{zIndex:1}}
              >
                <Box sx={modalStyle}>
                  <LabeledTextField labelName={'insert form name:'}
                                    variant={'standard'}
                                    placeholder={'placeholder'}
                                    onchange={(e) =>{setFormName(e.target.value)}}/>
                  <Button onClick={toggleDrawer(true)}> + add field</Button>
                  <Divider/>

                  <Box sx={{display:'flex', justifyContent:'flex-end'}}>


                  <BasicButton text={'delete'}
                            color={'magenta.main'} onClick={() => {handleModalClose()}}
                            fullWidth={true}/>
                  <BasicButton text={'save'} 
                              color={'cyan.main'} 
                              textColor={'white'} 
                              fullWidth={true}
                              onClick={() => { insertNewForm()}}/>

                  </Box>


                  

                </Box>

              </Modal>
              {/* <FieldOptions open={openAddField}
                           setOpen={setOpenAddField}/>  */}
            </>
          );
        }
        
    
