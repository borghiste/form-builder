import React, { useState } from "react";

// COMPONENTS
import BasicButton from "../components/UI/BasicButton";
// MUI
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
// STORE
import { useRegistration } from "../stores/useRegistrationStore";

type RegisterFormData = {
  owner_name: string;
  email: string;
  organization_name: string;
  password: string;
  password_confirmation: string;
  acceptedTerms: boolean;
};

type RegisterErrors = Partial<Record<keyof RegisterFormData, string>>;

export default function RegistrationForm() {
  const {owner_name, email, password, loading, error, success, setField, register} = useRegistration();


  const [errors, setErrors] = useState<RegisterErrors>({});


  //  Submit
  async function handleRegistration(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); 
    let attempt = 0;
    

    
    const result = await register();
    console.log(result)
   
    
  }

  return (
    <Box
      component="form"
      onSubmit={handleRegistration}
      mx="auto"
      mt={8}
      p={4}
      boxShadow={3}
      borderRadius={2}
      sx={{height:'100vh'}}>

    <Stack spacing={3}>
        <Typography
          variant="h5"
          color="text.secondary"
          fontWeight="bold"
          textAlign="center"
        >
          Create your account
        </Typography>

        <TextField
          name="fullName"
          label="Full Name"
          
          onChange={(e) => setField('owner_name', e.target.value)}
          error={!!errors.owner_name}
          helperText={errors.owner_name}
          fullWidth
        />

        <TextField
          name="email"
          label="Email"
          type="email"
         
          onChange={(e) => setField('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
        />

        <TextField
          name="company"
          label="Company Name"
          
          onChange={(e) => setField('organization_name', e.target.value)}
          fullWidth
        />

        <TextField
          name="password"
          label="Password"
          type="password"
          
          onChange={(e) => setField('password', e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
        />

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          
          onChange={(e) => setField('password_confirmation', e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          fullWidth
        />

        <FormControlLabel
          control={
            <Checkbox
              name="acceptedTerms"
              
              onChange={(e) => setField('acceptedTerms', e.target.checked)}
            />
          }
          label={
            <Box
              component={Link}
              to="/terms-and-privacy"
              target="_blank"
              sx={{
                color: "text.primary",
                textDecoration: "none",
                "&:hover": {
                  color: "cyan.main",
                  textDecoration: "underline",
                },
              }}
            >
              Accept terms and privacy policy
            </Box>
          }
        />

        {errors.acceptedTerms && (
          <Typography color="error" variant="body2">
            {errors.acceptedTerms}
          </Typography>
        )}

        <BasicButton
          text={loading ? "Loading..." : "Register"}
          color="cyan.main"
          textColor="white"
          type="submit"
        />
      </Stack>
    </Box>
  );
}
