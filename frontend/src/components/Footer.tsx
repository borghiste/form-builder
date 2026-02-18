
import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

export default function Footer(){
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} · Developed by{' '}
            <Link
              href="https://www.linkedin.com/in/borghi-stefano"
              target="_blank"
              underline="hover"
              color="primary"
              sx={{ fontWeight: 500 }}
            >
            Stefano Borghi
            </Link>
          </Typography>

          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              href="/terms-and-privacy"
              target="_blank"
              underline="hover"
              color="text.secondary"
              variant="body2"
              sx={{
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/about"
              underline="hover"
              color="text.secondary"
              variant="body2"
              sx={{
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              About
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

 