import React, { useEffect, useState, useContext } from "react";
import { Outlet } from "react-router-dom";

// MUI
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

// COMPONENTS
import BasicButton from "../components/UI/BasicButton";
import Modal from "../components/Modal";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { selectUser } from "../features/UserSlice";
import { fetchFormsList, deleteForm, getForm } from "../features/formsListSlice";
import { selectForms } from "../features/formsListSlice";
import { setFormFields, setFormName, setForm } from "../features/formSlice";
import { modalContext } from "../App";

export default function FormsList() {
  const dispatch = useDispatch<AppDispatch>();
  const forms = useSelector(selectForms);
  const User = useSelector(selectUser);
  const { newFormClick, setNewFormClick } = useContext(modalContext);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchFormsList());
  }, [dispatch]);

  const handleModalClose = () => {
    setModalOpen(false);
    setNewFormClick(false);
  };

  const handleNewFormClick = () => {
    setNewFormClick(true);
    setModalOpen(true);
    dispatch(setFormFields([]));
  };

  const handleViewForm = async (formId: number) => {
    const selectedForm = await dispatch(getForm(formId)).unwrap();
    console.log(selectedForm.form_fields);
    dispatch(setForm({name:selectedForm.name,
                  form_fields: selectedForm?.form_fields
    }))

    setModalOpen(true);
    setNewFormClick(false);
    
  };

  const handleEditForm = async (formId: number) => {
    const selectedForm = await dispatch(getForm(formId)).unwrap();
    dispatch(setFormFields(selectedForm.fields || []));
    setModalOpen(true);
    setNewFormClick(true);
  };

  return (
    <>
      <Modal modalIsOpen={modalOpen} handleModalClose={handleModalClose} />

      <Container sx={{ minHeight: "100vh", mt: 4 }}>
    

        <TableContainer component={Paper} sx={{ mt: 2, bgcolor:'background.default' }}>
          <Table sx={{ minWidth: 650 }} aria-label="forms table">
            <TableHead>
              <TableRow>
                <TableCell><b>Form Name</b></TableCell>
                <TableCell><b>Created Time</b></TableCell>
                <TableCell><b>Updated Time</b></TableCell>
                <TableCell sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><b>Actions</b>
                {User.role === "admin" && (
          <BasicButton
            text="+ NEW FORM"
            variant="contained"
            color="gray.light"
            textColor="black"
           
            onClick={handleNewFormClick}
          />
        )}
        </TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {forms?.map((form) => {
                const createdDate = new Date(form.created_at).toISOString().slice(0, 10);
                const updatedDate = new Date(form.updated_at).toISOString().slice(0, 10);

                return (
                  <TableRow key={form.id} hover>
                    <TableCell component="th" scope="row">{form.name}</TableCell>
                    <TableCell>{createdDate}</TableCell>
                    <TableCell>{updatedDate}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <BasicButton
                          text="View"
                          color="cyan.dark"
                          textColor="white"
                          onClick={() => handleViewForm(form.id)}
                        />
                        {User.role === "admin" && (
                          <>
                            <BasicButton
                              text="Edit"
                              onClick={() => handleEditForm(form.id)}
                            />
                            <BasicButton
                              text="Delete"
                              color="magenta.dark"
                              textColor="black"
                              onClick={() => dispatch(deleteForm(form.id))}
                            />
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Outlet />
    </>
  );
}

// import React from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import { useEffect } from "react";


// //MUI
// import { Container, List,  ListItem, ListItemText, Divider, Box } from "@mui/material";
// //COMPONENTS
// import BasicButton from "../components/UI/BasicButton";
// //REDUX
// import {selectUser} from '../features/UserSlice';
// import { AppDispatch } from "../app/store";
// import {useSelector, useDispatch} from 'react-redux';
// import { fetchFormsList, deleteForm, getForm } from '../features/formsListSlice';
// import { selectForms } from "../features/formsListSlice";
// import Modal from '../components/Modal';
// import { useState, useContext } from "react";
// import { modalContext } from "../App";
// import { setFormFields } from "../features/formSlice";


// export default  function FormsList(){


//      const dispatch = useDispatch<AppDispatch>();

//     const  forms = useSelector(selectForms) //get the form list state from redux
//     const User = useSelector(selectUser) //get the user state from redux
//     const {newFormClick,setNewFormClick} = useContext(modalContext);  //context to manage if the modal is for new form or view form
    
   

// useEffect(() => {dispatch(fetchFormsList()) //fetch the forms list on component mount   
// }
// , [forms])

// const [modalOpen, setModalOpen] = useState(false); //state to manage modal open/close

// const handleModalClose = () => { setModalOpen(false); //function to close the modal
//     setNewFormClick(false) //reset the new form click context
    
//  }


//  const handleNewFormisClicked = () => {
     
//     setNewFormClick(true); //new form button is clicked
//     setModalOpen(true); // modal opens
//     dispatch(setFormFields([]));
    
    
//   }


//   const handleViewForm = async (formId) => {

//     const selectedForm = await dispatch(getForm(formId)).unwrap();
    
//     dispatch(setForm({...selectedForm}));
//       setModalOpen(true);
//       setNewFormClick(false);
    
//     }
  
  

// const handleEditForm = (formId) => {
//   dispatch(getForm(formId));
//                                     setModalOpen(true);
//                                     setNewFormClick(true);
// }



//     return(
//         <>


//         <Modal modalIsOpen={modalOpen} handleModalClose={handleModalClose} />
        
        
      

// <Container disableGutters={true} component={'div'} sx={{minHeight:'100vh'}}>

// <List className=' w-full' sx={{zIndex:0, display:'flex', flexDirection: 'column'}}>

//     <ListItem>
//         <ListItemText primary='Form Name' primaryTypographyProps={{ fontWeight: 'bold' }}/>
//         <ListItemText primary='Created time' primaryTypographyProps={{ fontWeight: 'bold' }}/>
         
//         <ListItemText   primary='updated time' primaryTypographyProps={{ fontWeight: 'bold' }}/>
       
//         { 
//          User.role === 'admin' ? <BasicButton text={'+ NEW FORM'} 
//          variant={'contained'} 
//          color={'gray.light'} 
//          textColor={'black'}
//          width={200}
//          onClick={()=>{handleNewFormisClicked()}}
//         //   set the modal to create a new form
//          /> : null }
                    
//     </ListItem>
//     <Divider/>

//     {forms?.map((form)=> {
    
//         const createdDate = new Date(form.created_at).toISOString().slice(0, 10);
//         const updatedDate = new Date(form.updated_at).toISOString().slice(0, 10);
//         return(
//             <div key={form.id}>
//         <ListItem>
// <ListItemText>{form.name}</ListItemText>

// <ListItemText  primary={createdDate}/>
          
     

//         <ListItemText primary={updatedDate}/>
        
      
//         <Box sx={{display:'flex'}}>
        
//         <BasicButton text={'view'} color={'cyan.dark'} textColor={'white'}
//                         onClick={()=>{handleViewForm(form.id)}}/>

//         { User.role == 'admin' ? (
//             <>
//          <BasicButton text={'edit'}/>
//         <BasicButton text={'delete'}
//           onclick={() => {dispatch(deleteForm(form.id))} } 
//         color={'magenta.dark'} 
//             textColor={'black'}
//             onClick={() => {dispatch(deleteForm(form.id))}} 
//              />
//             </>
//         ) : null
//     }
//         </Box>
       
       

 
// </ListItem>
//     </div>

// )
// }

// )
// }
// <Divider/>
// </List>



// </Container>
// <Outlet/>

// </>


//   )
// }

    
