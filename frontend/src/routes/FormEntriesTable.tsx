import React, { useContext, useEffect } from "react";
//COMPONENTS
import ModalWindow from "../components/ModalWindow";

//MUI

//REDUX
import { selectEntries, fetchFormEntries} from '../features/FormEntriesSlice';
import { useDispatch, useSelector } from "react-redux";
import { setEntryObj, setMode,  setModalOpen, selectModalOpen} from "../features/ModalSlice";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Container
} from "@mui/material";
import BasicButton from "../components/UI/BasicButton";





export default function FormEntriesTable() {
  const dispatch = useDispatch();
  const entries = useSelector(selectEntries);
  const modalOpen = useSelector(selectModalOpen);

  
  useEffect(() => {
  
   
    dispatch(fetchFormEntries())
  
  
    
  }, entries)

  const handleModalClose = () => {
    setModalOpen(false)
  }
  const viewSubmission = (entry) => {
    dispatch(setModalOpen(true));
  
  
    dispatch(setMode('submission'));
    dispatch(setEntryObj(entry));
    
    setModalOpen(true)
  }
  
  
  
  

  if (entries.length === 0) return <div>No entries</div>;

  

  return (
    <>
    <ModalWindow modalIsOpen={modalOpen}
    handleModalClose={handleModalClose} />
    <Container sx={{ minHeight: "100vh", mt: 4 }}>
    <TableContainer component={Paper} sx={{bgcolor:'background.default'}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Submit date</TableCell>
            <TableCell>Update date</TableCell>
            <TableCell>name</TableCell>
            <TableCell>role</TableCell>
            <TableCell>submission</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
           
            entries?.map((entry) => {
              
           
              const submitDate = new Date(entry.created_at).toISOString().slice(0, 10);
              const updatedDate = new Date(entry.updated_at).toISOString().slice(0, 10);
              return (
                <TableRow key={entry.id}>
              <TableCell>{entry.id}</TableCell>
              <TableCell>{submitDate}</TableCell>
              <TableCell>{updatedDate}</TableCell>
              <TableCell>{entry.data.name}</TableCell>
              <TableCell>{entry.data.role}</TableCell>
              <TableCell><BasicButton text={'view'}
              onClick={() => viewSubmission(entry)}/></TableCell>
            </TableRow>
          )})
        }  

         
        </TableBody>
      </Table>
    </TableContainer>
  </Container>
  
        </>
  )

}
