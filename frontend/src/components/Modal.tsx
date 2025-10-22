 import React, { useRef, useState, useContext } from "react";
  import  {modalContext }  from '../App';  

//MUI

 import Box from '@mui/material/Box';
 import Button from '@mui/material/Button';
 import Typography from '@mui/material/Typography';
 //COMPONENTS
 import Modal from '@mui/material/Modal';
 import BasicButton from "./UI/BasicButton";

 import LabeledTextField from "./UI/LabeledTextField";
 
 import BuilderWindow from "../components/BuilderWindow/BuilderWindow";
 ;

 import FormView from "../components/FormView";
 //REDUX
 import { selectForm } from '../features/formSlice';


 import { useDispatch, useSelector } from "react-redux";

// //MUI
 import { colors, Divider, Stack } from "@mui/material";

export default function FormBuilderModal({modalIsOpen, handleModalClose }){
  const {newFormClick, setNewFormClick} = useContext(modalContext);


//   // MODAL STYLE

  const boxStyle = {
      
     position: 'absolute',
    
    display:'flex',
    justifyContent:'center',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     maxWidth: '100%',
     mazHeight:'100%',
     bgcolor: 'background.default',
     border: '1px solid #000',
     boxShadow: 24,
     
     p: 0,
     
  }

  return(
    <>
    <Modal
                     open={modalIsOpen}
                     onClose={handleModalClose}
                     // aria-labelledby="modal-modal-title"
                     // aria-describedby="modal-modal-description"
                     sx={{zIndex:1, overflow:'scroll'}}>
                      
                      <Box sx={boxStyle}>
                      
                       
                        <Divider/>
                        <Box sx={{display:'flex', flexDirection:{xs:'column',sm:'row'}}}>

                        
                        {
                          newFormClick ? <BuilderWindow handleModalClose={handleModalClose} /> 
                            : <FormView/>
                          }
                        
                        </Box>
                        
                      
                       
                        
                      </Box>
                     </Modal>
                         
                       </>
  )

   

  







                   


                  


                





                 
                 


        
}