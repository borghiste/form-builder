import React from 'react';
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
  IconButton
} from '@mui/material';
import {
  Print as PrintIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  ChatBubble as ChatBubbleIcon,
  ContentCopy as ContentCopyIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

export default function SubmissionDetail({entry}) {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 4}}>
      <Container sx={{overflow:'auto'}}>
  

        {/* Page Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <Box>
            <Typography variant="h3" fontWeight={600} gutterBottom>
              Submission #{entry[0].id}
            </Typography>
            
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              sx={{ fontWeight: 700 }}
            >
              Print
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              color="error"
              sx={{ fontWeight: 700 }}
            >
              Delete Entry
            </Button>
          </Box>
        </Box>

        {/* Main Detail Card */}
        <Paper elevation={1} sx={{ borderRadius: 3, overflow: 'hidden' }}>
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
              gap: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Submitted on Oct 24, 2023 at 10:42 AM
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                label="NEW"
                size="small"
                sx={{
                  bgcolor: '#e3f2fd',
                  color: '#1565c0',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  border: 1,
                  borderColor: '#90caf9'
                }}
              />
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                ID: REF-9928-XA
              </Typography>
            </Box>
          </Box>

          {/* Card Content */}
          <Box>
            <Grid container spacing={4}>
              {/* Section Header */}
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Personal Information
                </Typography>
                <Divider />
              </Grid>

              {/* Full Name */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    display: 'block',
                    mb: 1
                  }}
                >
                  Full Name
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  John Doe
                </Typography>
              </Grid>

              {/* Email */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    display: 'block',
                    mb: 1
                  }}
                >
                  Email Address
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, '&:hover .copy-icon': { opacity: 1 } }}>
                  <Typography variant="body1" fontWeight={500}>
                    john.doe@example.com
                  </Typography>
                  <IconButton
                    size="small"
                    className="copy-icon"
                    sx={{ opacity: 0, transition: 'opacity 0.2s' }}
                    title="Copy email"
                  >
                    <ContentCopyIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </Grid>

        

              {/* Message Section */}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <ChatBubbleIcon sx={{ color: '#2b6cee', fontSize: 24 }} />
                  <Typography variant="h6" fontWeight={700}>
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