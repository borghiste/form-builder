import React, { useRef, useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BasicButton from "./UI/BasicButton";
import FieldOptions from "./FieldOptions";
import LabeledTextField from "./UI/LabeledTextField";
import FormFieldsSection from "./FormFieldsSection";
import FormPreview from "./FormPreview";
//REDUX
import { addNewForm } from "../features/formsListSlice";
import { useDispatch, UseDispatch } from "react-redux";
//MUI
import { Divider } from "@mui/material";

export default function FormBuilder({modalIsOpen, handleModalClose}){
  const dispatch = useDispatch();

  // MODAL STYLE

  const modalStyle = {
      
    position: 'absolute',
    
  
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%',
    bgcolor: 'background.default',
    border: '2px solid #000',
    boxShadow: 24,
    p: 0,
    };


// STATES

  const [openAddField, setOpenAddField] = useState(false);

  const [formName, setFormName] = useState('');

  const description = 'test descr';
  

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenAddField(newOpen);
  };

  //ADD NEW FORM FUNCTION
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
                // aria-labelledby="modal-modal-title"
                // aria-describedby="modal-modal-description"
                sx={{zIndex:1}}
              >
                <Box sx={modalStyle}>
                  <Box sx={{display:'flex', justifyContent:'space-between'}}>

                  <Typography variant="h5" sx={{p:0}}>Form Builder</Typography>
                  <Button sx={{ p:0}}>X</Button>
                  </Box>
                <Divider/>

                  <Box >
                    <FormFieldsSection addFieldAction={() => toggleDrawer(true)}/>
                    <Divider/>
                    <FormPreview/> 


                  </Box>


                





                 
                  <Divider/>

                  <Box sx={{display:'flex', justifyContent:'flex-end'}}>


                  <BasicButton text={'cancel'}
                            color={'magenta.main'}
                            textColor={'black'} onClick={() => {handleModalClose()}}
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
                           setOpen={setOpenAddField}/>   */}
            </>
          );
        }
        
    
