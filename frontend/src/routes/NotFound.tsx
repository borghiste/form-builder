import React from 'react';
import { Box, Button, InputBase, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'grey.100',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 480,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          p: { xs: 3, sm: 5 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Error code row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography
            sx={{
              fontSize: 64,
              fontWeight: 700,
              color: 'text.primary',
              lineHeight: 1,
              letterSpacing: -2,
            }}
          >
            404
          </Typography>

          <Box sx={{ width: '1px', height: 56, bgcolor: 'divider' }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <SearchIcon sx={{ color: 'primary.main', fontSize: 28 }} />
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                fontSize: 10,
              }}
            >
              Page not found
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: '100%', height: '1px', bgcolor: 'divider', mb: 3 }} />

        {/* Message */}
        <Typography variant="h6" fontWeight={600} mb={1} textAlign="center">
          This page doesn't exist
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ lineHeight: 1.7, mb: 3.5 }}
        >
          The page you're looking for may have been moved, deleted, or never
          existed. Check the URL or head back to the dashboard.
        </Typography>

        {/* Search field */}
        <Box sx={{ width: '100%', mb: 0.5 }}>
          <Typography
            variant="caption"
            fontWeight={500}
            color="text.secondary"
            display="block"
            mb={0.75}
          >
            Looking for something specific?
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1.5,
              bgcolor: 'grey.50',
              px: 1.5,
              py: 0.5,
              gap: 1,
              '&:focus-within': {
                borderColor: 'primary.main',
                bgcolor: 'background.paper',
              },
            }}
          >
            <SearchIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
            <InputBase
              fullWidth
              placeholder="Search forms..."
              sx={{ fontSize: 13 }}
            />
          </Box>
          <Typography variant="caption" color="text.disabled" mt={0.5} display="block">
            Search by form name or description
          </Typography>
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 1.5, width: '100%', mt: 2.5 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Go back
          </Button>
          <Button
            fullWidth
            variant="contained"
            startIcon={<DashboardIcon />}
            onClick={() => navigate('/')}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Dashboard
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}