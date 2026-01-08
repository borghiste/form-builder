import React from "react";
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  
  export default function RegisterForm() {
    return (
      <Box
        component={'form'}
        mx="auto"
        mt={8}
        p={4}
        boxShadow={3}
        borderRadius={2}>
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Create your account
          </Typography>
  
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
          />
  
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
          />
  
          <TextField
            label="Company Name"
            type="text"
            fullWidth
          />
  
          <FormControlLabel
            control={<Checkbox required />}
            label="Accetto Terms & Privacy"
          />
  
          <Button
            variant="contained"
            size="large"
            fullWidth
          >
            Registrati con Email
          </Button>
  
          {/* <Divider>o</Divider>
  
          <Button
            variant="outlined"
            size="large"
            fullWidth
          >
            Continua con Google
          </Button>
  
          <Button
            variant="outlined"
            size="large"
            fullWidth
          >
            Continua con Microsoft
          </Button> */}
        </Stack>
      </Box>
    );
  }
  