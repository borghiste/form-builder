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
  TableFooter,
} from "@mui/material";

// COMPONENTS
import BasicButton from "../components/UI/BasicButton";
import ModalWindow from "../components/ModalWindow";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

import { fetchFormsList, deleteForm, getForm } from "../features/formsListSlice";
import { selectForms } from "../features/formsListSlice";
import { setFormFields, selectForm, setForm } from "../features/formSlice";


import { useModalStore } from "../stores/useModalStore";
import { useAuthentication } from "../stores/useAuthStore";

// utils




export default function FormsList() {
  const {setModalOpen, setModalMode} = useModalStore();
  const dispatch = useDispatch<AppDispatch>();
  const forms = useSelector(selectForms);
  const {user} = useAuthentication();
  
  const form = useSelector(selectForm);
  

  useEffect(() => {
     dispatch(fetchFormsList());
   }, forms);

  const handleModalClose = () => {
     setModalOpen(false);
    setModalMode(null);
    dispatch(setForm({ ...form, name: '' }));
  };

   const handleNewFormClick = () => {
     setModalMode('newForm');
     setModalOpen(true);
     dispatch(setFormFields([]));
   };

   const handleViewForm = async (formId: number) => {
     const selectedForm = await dispatch(getForm(formId)).unwrap();
   
     dispatch(setForm({id: selectedForm.id,name:selectedForm.name,
                   form_fields: selectedForm?.form_fields
     }))
     setModalOpen(true);
     setModalMode('view');
   };

   function handleInviteClick() {
    setModalMode('invite');
    setModalOpen(true);
   }

  const handleEditForm = async (formId: number) => {
    const selectedForm = await dispatch(getForm(formId)).unwrap();
    dispatch(setFormFields(selectedForm.form_fields));
    dispatch(setForm(selectedForm));
    setModalOpen(true);
  
  };

  return (
    
    <>
       <ModalWindow/> 

      <Container sx={{ minHeight: "100vh", mt: 4 }}>
    

        <TableContainer component={Paper} sx={{ mt: 2, 
           bgcolor:'background.default' }}>
          <Table sx={{ minWidth: '100%' }} aria-label="forms table">
            <TableHead>
              <TableRow>
                <TableCell><b>Form Name</b></TableCell>
                <TableCell><b>Created Time</b></TableCell>
                <TableCell><b>Updated Time</b></TableCell>
                <TableCell sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><b>Actions</b>
                {user?.role === "admin" && (
          <BasicButton
            text="+ new form"
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
                        {user.role === "admin" && (
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
          

        <TableFooter sx={{display:'flex', justifyContent:'end'}}>
          
              <TableRow sx={{display:'flex', maxWidth:'100%'}}>
                
                <TableCell sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                {user?.role === "admin" && (
          <BasicButton
            text="+ invite"
            variant="contained"
            color="gray.light"
            textColor="black"
            onClick={() => handleInviteClick()}
           
            
          />
        )}
        </TableCell>
               
              </TableRow>
            </TableFooter>
        </TableContainer>
      </Container>

      <Outlet />
    </>
  );
}