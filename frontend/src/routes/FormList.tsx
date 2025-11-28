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
  const { setContext } = useContext(modalContext);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchFormsList());
  }, [dispatch]);

  const handleModalClose = () => {
    setModalOpen(false);
    setContext(null);
  };

  const handleNewFormClick = () => {
    setContext('newForm');
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
    setContext('view');
    
  };

  const handleEditForm = async (formId: number) => {
    const selectedForm = await dispatch(getForm(formId)).unwrap();
    dispatch(setFormFields(selectedForm.form_fields));
    dispatch(setForm(selectedForm));
    setModalOpen(true);
    setContext('editing');
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
