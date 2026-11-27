import React, { use, useEffect, useContext } from 'react';

import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Paper,
  Chip,
  Grid,
  Divider,
  IconButton,
} from '@mui/material';
import {
 
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  ChatBubble as ChatBubbleIcon,
  ContentCopy as ContentCopyIcon,
  
} from '@mui/icons-material';
import { useEntriesStore } from '../stores';
import BasicButton from './UI/BasicButton';

export default function SubmissionDetail() {

  const { selectedEntry} = useEntriesStore()
  console.log(selectedEntry)


     const submitDate = new Date(selectedEntry.created_at).toISOString().slice(0, 10)
  return (
    <Box sx={{ bgcolor: 'background.default', py: 4 }}>
      <Container sx={{ overflow: 'auto' }}>
        {/* Page Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent:'space-evenly' , gap: 1.5 }}>

            <BasicButton
            text='back'/>
         
            <Button
              variant='contained'
              startIcon={<DeleteIcon />}
              color='error'
              sx={{ fontWeight: 700 }}
            >
              Delete Entry
            </Button>
          </Box>
        </Box>

        {/* Main Detail Card */}
        <Paper
          elevation={1}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            backgroundColor: 'background.paper',
            mt: 4,
          }}
        >
          {/* Card Header */}
          <Box
            sx={{
              px: 3,
              py: 2.5,
              bgcolor: 'grey.50',
              borderBottom: 1,
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography variant='h5' fontWeight={600} gutterBottom>
             {selectedEntry?.form.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            </Box>
              <CalendarIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              <Typography
                variant='body2'
                color='text.secondary'
                fontWeight={500}>
             {submitDate}
              </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          
         
            </Box>
          </Box>

          {/* Card Content */}
          <Box>
            <Grid container spacing={4}>
              {/* Section Header */}
              <Grid item xs={12}>
                
                <Divider />
              </Grid>

              {/* Full Name */}
              <Grid item xs={12} md={6}>
        
       {Object.entries(selectedEntry?.data || {}).map(([chiave, valore]) => (
  <Box key={chiave} sx={{ mb: 2 }}>
    <Typography
      variant="caption"
      sx={{
        color: 'text.secondary',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 1,
        display: 'block',
        mb: 1,
      }}
    >
      {chiave}
    </Typography>
    <Typography variant="body1" fontWeight={500}>
      {String(valore)}
    </Typography>
  </Box>
))}
                </Grid>

              {/* Email */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant='caption'
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    display: 'block',
                    mb: 1,
                  }}
                >
                  Value
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    '&:hover .copy-icon': { opacity: 1 },
                  }}
                >
                  <Typography variant='body1' fontWeight={500}>
                    john.doe@example.com
                  </Typography>
                  <IconButton
                    size='small'
                    className='copy-icon'
                    sx={{ opacity: 0, transition: 'opacity 0.2s' }}
                    title='Copy email'
                  >
                    <ContentCopyIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </Grid>

              {/* Message Section */}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
                >
                  <ChatBubbleIcon sx={{ color: '#2b6cee', fontSize: 24 }} />
                  <Typography variant='h6' fontWeight={700}>
                    Message Content
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
