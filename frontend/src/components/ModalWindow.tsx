 import React, { useContext } from "react";
import { useModalStore } from "../stores/useModalStore";  

//MUI

 import { Box, Modal} from '@mui/material';
 //COMPONENTS

 import BuilderWindow from "./BuilderWindow/BuilderWindow";
 import FormEntry from './FormEntry';
 
 import FormView from "./FormView";



// //MUI
 import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useModalStore } from "../stores/useModalStore";

export default function ModalWindow({message}:{message:string}) {
  const dispatch = useDispatch();
  const {modalMode} = useModalStore();
  const {modalOpen, setModalOpen} = useModalStore();
  
  

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
                     onClose={() => setModalOpen(false)}
                     // aria-labelledby="modal-modal-title"
                     // aria-describedby="modal-modal-description"
                     sx={{zIndex:1, overflow:'scroll'}}>
                      
                      <Box sx={boxStyle}>
                        {message}
                        <Divider/>
                        <Box sx={{display:'flex', flexDirection:{xs:'column',sm:'row'}}}>

                        
                         {
                          (modalMode === 'newForm' || modalMode === 'editing') && <BuilderWindow/> 
                            
                          } 
                          {modalMode=== 'view' && <FormView disabledFields={false}/>}

                          {/* {context === 'created' && 'created'} */}

                          { modalMode === 'submission' && <FormEntry  />}
                      
                        </Box>
                        
                      
                       
                        
                      </Box>
                     </Modal>
                         
                       </>
  )

   

  







                   


                  


                





                 
                 


        
}