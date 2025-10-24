import React, { use, useEffect } from "react";
import { useState } from "react";
//COMPONENTS
import BasicButton from './UI/BasicButton';
//REDUX

import { useDispatch, useSelector } from "react-redux";
import { selectList } from "../features/formsListSlice";
import { selectForm } from '../features/formSlice';
import { selectStatus } from "../features/formSlice";

import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  Divider,
  Chip,
} from "@mui/material";
import { RootState } from "../app/store";


export default function FormView() {

  const dispatch = useDispatch();

  
  const form = useSelector(selectForm);
  const status = useSelector(selectStatus)
  
  useEffect(() => {

    console.log('form in view', form?.form_fields);
  },[form])


  return (


  <>
<Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }} elevation={3}>
        <Typography variant="h5" component="h1" gutterBottom>
          {form.name}
        </Typography>

        <Box component="form"  noValidate>
          <Grid container spacing={2}>
     

            {/* <Grid item xs={12}>
              <TextField
                label="Nome"
                fullWidth

                autoComplete="name"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
               
                
                
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
               
            
                autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="role-label">Ruolo</InputLabel>
                <Select
                  labelId="role-label"
                  label="Ruolo"
               
                 
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="guest">Guest</MenuItem>
                </Select>
              
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormControlLabel
                  control={
                    <Checkbox
                 
                     
                      name="acceptTerms"
                    />
                  }
                  label="Accetto i termini e le condizioni"
                />
               
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", gap: 2 }}>
              <Button type="submit" variant="contained">
                Invia
              </Button>

              <Button
                type="button"
                variant="outlined"
               
              
              >
                Reset
              </Button>
            </Grid> */}

       
          </Grid>
        </Box>
      </Paper>
    </Container>
 



  </>

  )
}
