 import React, { useContext } from "react";
  import  {modalContext }  from '../App';  

//MUI

 import { Box, Modal} from '@mui/material';
 //COMPONENTS

 import BuilderWindow from "./BuilderWindow/BuilderWindow";
 import FormEntry from './FormEntry';
 
 import FormView from "./FormView";

 //REDUX

 import {selectModalMode, setModalOpen, selectModalOpen } from "../features/ModalSlice";

// //MUI
 import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function ModalWindow(){
  const dispatch = useDispatch();
  const ModalMode = useSelector(selectModalMode);
  const modalOpen = useSelector(selectModalOpen);
  
  

 // MODAL STYLE

  const boxStyle = {
     position: 'absolute',
    overflow:'auto',
    display:'flex',
    justifyContent:'center',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     maxWidth: '100%',
     mazHeight:'100%',
     
     p: 0,
     
  }

  return(
    <>
    <Modal
                     open={modalOpen}
                     onClose={() => dispatch(setModalOpen(false))}
                     // aria-labelledby="modal-modal-title"
                     // aria-describedby="modal-modal-description"
                     sx={{zIndex:1, overflow:'scroll'}}>
                      
                      <Box sx={boxStyle}>
                        <Divider/>
                        <Box sx={{display:'flex', flexDirection:{xs:'column',sm:'row',                  }}}>

                        
                         {
                          (ModalMode === 'newForm' || ModalMode === 'editing') && <BuilderWindow/> 
                            
                          } 
                          {ModalMode=== 'view' && <FormView disabledFields={false}/>}

                          {/* {context === 'created' && 'created'} */}

                          { ModalMode === 'submission' && <FormEntry  />}
                      
                        </Box>
                        
                      
                       
                        
                      </Box>
                     </Modal>
                         
                       </>
  )

   

  







                   


                  


                





                 
                 


        
}