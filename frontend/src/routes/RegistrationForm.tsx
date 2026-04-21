import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


// COMPONENTS
import BasicButton from "../components/UI/BasicButton";
import ModalWindow from "../components/ModalWindow";
// MUI
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// STORE
import { useRegistration } from "../stores/useRegistrationStore";
import { useModalStore } from "../stores/useModalStore";


type RegisterFormData = {
  owner_name: string;
  email: string;
  organization_name: string;
  password: string;
  password_confirmation: string;
  acceptedTerms: boolean;
};



export default function RegistrationForm() {
  const {owner_name, email, password, loading, error, errors,  success, setField, register} = useRegistration();
  const navigate = useNavigate();

  const {modalOpen, setModalMode, setModalOpen} = useModalStore();
const [message, setMessage] = useState('');
const attempt = useRef(0);



  //  Submit
  async function handleRegistration(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); 

    if (attempt.current >= 5) {
      setMessage('Too many registration attempts. Please try again later.');
    }
    

    
    const response = await register();
    
    if (response) {
      setModalOpen(true);
      console.log(useModalStore.getState().modalOpen);
      setMessage(response.message);
      setTimeout(() => {
        navigate('/login')}, 3000);


    }
    attempt.current++;
   
   
    

   
   
    
  }

  return (
    <>
    {/* <ModalWindow message={message}/> */}
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
          error={!!errors?.owner_name}
          helperText={errors?.owner_name}
          fullWidth
          required/>

        <TextField
          name="email"
          label="Email"
          type="email"
          
          onChange={(e) => setField('email', e.target.value)}
          error={!!errors?.email}
          helperText={errors?.email?.[0]}
          required
          fullWidth
          />

        <TextField
          name="company"
          label="Company Name"
          
          onChange={(e) => setField('organization_name', e.target.value)}
          fullWidth
          required
          />

        <TextField
          name="password"
          label="password"
          type="password"
          id="password"
          onChange={(e) => setField('password', e.target.value)}
          error={!!errors?.password}
          helperText={errors?.password}
          fullWidth
          required
          />

        <TextField
          name="confirmPassword"
          label="confirm password"
          type="password"
          
          onChange={(e) => setField('password_confirmation', e.target.value)}
          error={!!errors?.password_confirmation}
          helperText={errors?.password_confirmation}
          fullWidth
          required
          />

        <FormControlLabel
          control={
            <Checkbox
            name="acceptedTerms"
            required
            
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

        {errors?.acceptedTerms && (
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
        <Typography variant="body2" textAlign="center" color={error ? 'red' : 'text.secondary'}>
          {error || "Already have an account? "}
          <Link to="/login" style={{ color: "cyan.main", textDecoration: "none" }}>
            Login
          </Link>
     </Typography>
      </Stack>
    </Box>
          </>
  );
}
