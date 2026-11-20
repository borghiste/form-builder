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
                
                <TableCell>Form name</TableCell>
                <TableCell>Form created by</TableCell>
                <TableCell>Form submitted by</TableCell>
                <TableCell>Submit date</TableCell> 
                <TableCell>actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries?.map((entry) => {
                const submitDate = new Date(entry.created_at)
                  .toISOString()
                  .slice(0, 10);
                  return (
                    // Submit date	
                    // submitted by role	action
                    <TableRow key={entry.id}>
                    {/* // Form name	 */}
                    <TableCell>{entry.form.name}</TableCell>
                    {/* // Form created by	 */}
                    <TableCell>{entry.form.creator?.name ?? ''}</TableCell>
                    {/* // Form submitted by	 */}
                    <TableCell>{`${entry.submitted_by} - ${entry.submitted_by_role}` }</TableCell>
                    <TableCell>{submitDate}</TableCell>
                  
                    <TableCell>
                      <BasicButton
                        text={'view'}
                        onClick={viewSubmission}
                      />

                      <BasicButton
                      text='delete'
                      color='magenta.dark'/>
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
