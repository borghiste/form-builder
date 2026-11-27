import React, { useEffect } from 'react';

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

//type
import Entry from '../stores/useEntriesStore';

export default function FormEntriesTable({
  loadAllEntries = true,
}: {
  loadAllEntries?: boolean;
}) {
  const { entries, error, getAllEntries } = useEntriesStore();
  const { setModalOpen, setModalMode } = useModalStore();

  useEffect(() => {
    if (loadAllEntries) {
      void getAllEntries();
    }
  }, [getAllEntries, loadAllEntries]);

  const viewSubmission = (entry: Entry) => {
    useEntriesStore.setState({ selectedEntry: entry });
    
    setModalMode('submission');
    setModalOpen(true);
  };

  if (error) return <div role="alert">{error}</div>;
  if (entries?.length === 0) return <div>No entries</div>;

  return (
    <>
      
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
                 
                    // submitted by role	action
                    <TableRow key={entry.id}>
                    {/* // Form name	 */}
                    <TableCell>{entry.form.name}</TableCell>
                    {/* // Form created by	 */}
                    <TableCell>{entry.form.creator?.name ?? ''}</TableCell>
                    {/* // Form submitted by	 */}
                    <TableCell>{`${entry.submitted_by} - ${entry.submitted_by_role}`}</TableCell>
                       {/* // Submit date	 */}
                    <TableCell>{submitDate}</TableCell>
                  
                    <TableCell>
                      <BasicButton
                        text={'view'}
                        onClick={() => viewSubmission(entry)}
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
