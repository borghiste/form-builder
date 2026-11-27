import React from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useEntriesStore, useModalStore } from '../stores';

export default function SubmissionDetail() {
  const { selectedEntry, deleteEntry, isDeleting } = useEntriesStore();
  const { setModalOpen, setModalMode } = useModalStore();


  if (!selectedEntry) return null;

  const submitDate = new Date(selectedEntry.created_at).toLocaleDateString(
    'it-IT',
  );

  const closeModal = () => {
    setModalOpen(false);
    setModalMode(null);
  };

  const formatValue = (value: unknown) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

   const handleDeleteEntry = async () => {


     const deleted = await deleteEntry(selectedEntry.id);
     if (deleted) closeModal();
   };

  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: 'calc(100vw - 32px)', sm: 640 },
        maxHeight: 'calc(100vh - 32px)',
        overflow: 'auto',
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          bgcolor: 'grey.50',
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant='h5' component='h2' fontWeight={700}>
            {selectedEntry.form.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.75 }}>
            <CalendarIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
            <Typography variant='body2' color='text.secondary'>
              Submit date: {submitDate}
            </Typography>
          </Box>
        </Box>
        <IconButton
          aria-label='Close'
          onClick={closeModal}
          sx={{ mt: -0.5, mr: -0.5 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ px: 3, py: 2 }}>
        {
        
        Object.entries(selectedEntry.data || {}).map(([field, value]) => (
          <React.Fragment key={field}>
            <Grid container sx={{ py: 1.5, alignItems: 'flex-start' }}>
              <Grid item xs={5}>
                <Typography variant='body2' fontWeight={700} fontSize={'1.2rem'}>
                  {field}:
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }} fontSize={'1.2rem'}>
                  {formatValue(value)}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </React.Fragment>
        ))}
      </Box>

      <Box sx={{ px: 3, py: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant='contained'
          startIcon={<DeleteIcon />}
          color='error'
          onClick={handleDeleteEntry}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete Entry'}
        </Button>
      </Box>
    </Paper>
  );
}
