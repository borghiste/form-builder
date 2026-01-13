import React from "react";
// COMPONENTS
import BasicButton from "../UI/BasicButton";
// MUI
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
    // Registration form component
    // name, email,company, password, confirm password, terms checkbox

    function registration() {}
    return (
      <Box
        component={'form'}
        mx="auto"
        mt={8}
        p={4}
        boxShadow={3}
        borderRadius={2}
        maxWidth={'auto'}>
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Create your account
          </Typography>
  
          <TextField type="text"
          label="Full Name"/>

          <TextField
            label="Email"
            type="email"
            fullWidth
            required
          />
  
  
          <TextField
            label="Company Name"
            type="text"
            fullWidth
          />
  
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
          />

<TextField
            label="Confirm Password"
            type="password"
            fullWidth
            required
          />

          <FormControlLabel
            control={<Checkbox required />}
            label="Accept Terms & Privacy"
          />
          <BasicButton text='register'
          color='cyan.main'
          textColor='white'
          type='submit'
          onClick={() => registration()} />
  
          
        </Stack>
      </Box>
    );
  }
  