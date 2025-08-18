import React from "react";
import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function SimpleForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.role) newErrors.role = "Please select a role";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", form);
    }
  };

  return (
    <Box

      component="form"
      onSubmit={handleSubmit}
      sx={{  maxWidth: '100%', maxHeight:'100%', bgcolor:'background.default' }}
    >
      <Typography variant="h5" mb={2}>
        Registration Form
      </Typography>

      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name}
      />

      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />

      <FormControl fullWidth margin="normal" error={!!errors.role}>
        <InputLabel>Role</InputLabel>
        <Select
          name="role"
          value={form.role}
          onChange={handleChange}
          label="Role"
        >
          <MenuItem value="">-- Select Role --</MenuItem>
          <MenuItem value="developer">Developer</MenuItem>
          <MenuItem value="designer">Designer</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
        </Select>
        <Typography variant="caption" color="error">
          {errors.role}
        </Typography>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
}
