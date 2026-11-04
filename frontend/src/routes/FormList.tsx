import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

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
} from '@mui/material';

// COMPONENTS
import BasicButton from '../components/UI/BasicButton';
import ModalWindow from '../components/ModalWindow';

// STORE

import { useModalStore } from '../stores/useModalStore';
import { useAuthStore, useFormListStore } from '../stores/index';

// utils

export default function FormsList() {
  const { setModalOpen, setModalMode } = useModalStore();

  const { getForms, forms, getFormById, deleteForm, setSelectedForm } =
    useFormListStore();

  const { user } = useAuthStore();

  useEffect(() => {
    getForms();
  }, [getForms]);

  const handleNewFormClick = () => {
    setModalMode('newForm');
    setSelectedForm(null);

    setModalOpen(true);
  };

  const handleViewForm = async (formId: number) => {
    await getFormById(formId);

    setModalOpen(true);
    setModalMode('view');
  };

  function handleInviteClick() {
    setModalMode('invite');
    setModalOpen(true);
  }

  const handleEditForm = async (formId: number) => {
    await getFormById(formId);
    setModalMode('editing');

    setModalOpen(true);
  };

  const handleDeleteForm = async (formId: number) => {
    await deleteForm(formId);
  };

  return (
    <>
      <ModalWindow />

      <Container sx={{ minHeight: '100vh', mt: 4 }}>
        <TableContainer
          component={Paper}
          sx={{ mt: 2, bgcolor: 'background.default' }}
        >
          <Table sx={{ minWidth: '100%' }} aria-label='forms table'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Form Name</b>
                </TableCell>
                <TableCell>
                  <b>Created Time</b>
                </TableCell>
                <TableCell>
                  <b>Updated Time</b>
                </TableCell>
                <TableCell
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <b>Actions</b>
                  {user?.role === 'admin' && (
                    <BasicButton
                      text='+ new form'
                      variant='contained'
                      color='gray.light'
                      textColor='black'

                      onClick={handleNewFormClick}
                    />
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forms?.map((form) => {
                const createdDate = new Date(form.created_at)
                  .toISOString()
                  .slice(0, 10);
                const updatedDate = new Date(form.updated_at)
                  .toISOString()
                  .slice(0, 10);

                return (
                  <TableRow key={form.id} hover>
                    <TableCell component='th' scope='row'>
                      {form.name}
                    </TableCell>
                    <TableCell>{createdDate}</TableCell>
                    <TableCell>{updatedDate}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <BasicButton
                          text='View'
                          color='cyan.dark'
                          textColor='white'
                          onClick={() => handleViewForm(form.id)}
                        />
                        {user.role === 'admin' && (
                          <>
                            <BasicButton
                              text='Edit'
                              color='cyan.main'
                              textColor='white'
                              onClick={() => handleEditForm(form.id)}
                            />
                            <BasicButton
                              text='Delete'
                              color='magenta.dark'
                              textColor='white'
                              onClick={() => handleDeleteForm(form.id)}
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

          <TableFooter sx={{ display: 'flex', justifyContent: 'end' }}>
            <TableRow sx={{ display: 'flex', maxWidth: '100%' }}>
              <TableCell
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {user?.role === 'admin' && (
                  <BasicButton
                    text='+ invite'
                    variant='contained'
                    color='gray.light'
                    textColor='black'
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
