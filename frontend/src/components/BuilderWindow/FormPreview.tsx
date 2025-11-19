
import React, { useState } from "react";
// REDUX

import { selectForm } from "../../features/formSlice";
import { useSelector, useSelector } from "react-redux";

import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  FormHelperText,
  Box,
  Divider,
  Chip,
} from "@mui/material";

type FormData = {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "guest" | "";
  acceptTerms: boolean;
};



export default function FormPreview(){
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    role: "",
    acceptTerms: false,
  });
  const form = useSelector(selectForm);

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState<FormData | null>(null);



  const handleChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = (event.target as HTMLInputElement).type === "checkbox"
      ? (event.target as HTMLInputElement).checked
      : (event.target as HTMLInputElement).value;

    setData(prev => ({ ...prev, [field]: value }));

    // live validation for the single field
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };



  return (
<>
{
  form?.form_fields.map((field) => {
    return (
      <p>hh</p>
    )
  })
}
</>



  )
    // <Container maxWidth="sm" sx={{ mt: 6 }}>
    //   <Paper sx={{ p: 4, borderRadius: 3 }} elevation={3}>
    //     <Typography variant="h5" component="h1" gutterBottom>
    //       Registrazione (MUI)
    //     </Typography>

    //     <Box component="form" onSubmit={onSubmit} noValidate>
    //       <Grid container spacing={2}>
    //         <Grid item xs={12}>
    //           <TextField
    //             label="Nome"
    //             fullWidth
    //             value={data.name}
    //             onChange={handleChange("name")}
    //             error={!!errors.name}
    //             helperText={errors.name}
    //             autoComplete="name"
    //           />
    //         </Grid>

    //         <Grid item xs={12}>
    //           <TextField
    //             label="Email"
    //             type="email"
    //             fullWidth
    //             value={data.email}
    //             onChange={handleChange("email")}
    //             error={!!errors.email}
    //             helperText={errors.email}
    //             autoComplete="email"
    //           />
    //         </Grid>

    //         <Grid item xs={12}>
    //           <TextField
    //             label="Password"
    //             type="password"
    //             fullWidth
    //             value={data.password}
    //             onChange={handleChange("password")}
    //             error={!!errors.password}
    //             helperText={errors.password}
    //             autoComplete="new-password"
    //           />
    //         </Grid>

    //         <Grid item xs={12}>
    //           <FormControl fullWidth error={!!errors.role}>
    //             <InputLabel id="role-label">Ruolo</InputLabel>
    //             <Select
    //               labelId="role-label"
    //               label="Ruolo"
    //               value={data.role}
    //               onChange={handleChange("role")}
    //             >
    //               <MenuItem value="user">User</MenuItem>
    //               <MenuItem value="admin">Admin</MenuItem>
    //               <MenuItem value="guest">Guest</MenuItem>
    //             </Select>
    //             {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
    //           </FormControl>
    //         </Grid>

    //         <Grid item xs={12}>
    //           <FormControl error={!!errors.acceptTerms} component="fieldset">
    //             <FormControlLabel
    //               control={
    //                 <Checkbox
    //                   checked={data.acceptTerms}
    //                   onChange={handleChange("acceptTerms")}
    //                   name="acceptTerms"
    //                 />
    //               }
    //               label="Accetto i termini e le condizioni"
    //             />
    //             {errors.acceptTerms && <FormHelperText>{errors.acceptTerms}</FormHelperText>}
    //           </FormControl>
    //         </Grid>

    //         <Grid item xs={12} sx={{ display: "flex", gap: 2 }}>
    //           <Button type="submit" variant="contained">
    //             Invia
    //           </Button>

    //           <Button
    //             type="button"
    //             variant="outlined"
    //             onClick={() => {
    //               setData({ name: "", email: "", password: "", role: "", acceptTerms: false });
    //               setErrors({});
    //               setSubmitted(null);
    //             }}
    //           >
    //             Reset
    //           </Button>
    //         </Grid>

    //         {submitted && (
    //           <Grid item xs={12}>
    //             <Divider sx={{ my: 2 }} />
    //             <Typography variant="subtitle1">Hai inviato:</Typography>
    //             <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
    //               <Chip label={`Nome: ${submitted.name}`} />
    //               <Chip label={`Email: ${submitted.email}`} />
    //               <Chip label={`Ruolo: ${submitted.role}`} />
    //             </Box>
    //           </Grid>
    //         )}
    //       </Grid>
    //     </Box>
    //   </Paper>
    // </Container>
  
}
