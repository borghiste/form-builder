import React, { useEffect } from 'react';
//COMPONENTS
import ModalWindow from '../components/ModalWindow';

//MUI

//STORE
import {useEntriesStore, useModalStore} from '../stores/index';




import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Container,
} from '@mui/material';
import BasicButton from '../components/UI/BasicButton';

export default function FormEntriesTable() {
  const { entries, error, getEntries } = useEntriesStore();
  const { setModalOpen, setModalMode } = useModalStore();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  useEffect(() => {

    try{

      getEntries();
    } catch (e) {
      setErrorMessage('Failed to retrieve entries');
      console.log(e)
    }

  }, [getEntries]);

  const viewSubmission = () => {
    setModalMode('submission');
    setModalOpen(true);
  };

  if (error) return <div role="alert">{error}</div>;
  if (entries.length === 0) return <div>No entries</div>;

  return (
    <>
      <ModalWindow message="" />
      <Container sx={{ minHeight: '100vh', mt: 4 }}>
        <TableContainer
          component={Paper}
          sx={{ bgcolor: 'background.default' }}
        >
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
              {entries?.map((entry) => {
                const submitDate = new Date(entry.created_at)
                  .toISOString()
                  .slice(0, 10);
                const updatedDate = new Date(entry.updated_at)
                  .toISOString()
                  .slice(0, 10);
                return (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.id}</TableCell>
                    <TableCell>{submitDate}</TableCell>
                    <TableCell>{updatedDate}</TableCell>
                    <TableCell>{String(entry.data.name ?? '')}</TableCell>
                    <TableCell>{String(entry.data.role ?? '')}</TableCell>
                    <TableCell>
                      <BasicButton
                        text={'view'}
                        onClick={viewSubmission}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
