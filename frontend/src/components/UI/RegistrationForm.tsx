import React, { useState } from "react";

// COMPONENTS
import BasicButton from "../UI/BasicButton";
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

type RegisterFormData = {
  fullName: string;
  email: string;
  company: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

type RegisterErrors = Partial<Record<keyof RegisterFormData, string>>;

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);

  // 🔹 Handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔹 Validation
  function validate(): RegisterErrors {
    const newErrors: RegisterErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required";

    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.acceptedTerms)
      newErrors.acceptedTerms = "You must accept terms";

    return newErrors;
  }

  // 🔹 Submit
  async function handleRegistration(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      console.log("Submitting:", formData);

      // 👉 Qui andrà la tua chiamata API Laravel

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
          value={formData.fullName}
          onChange={handleChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
          fullWidth
        />

        <TextField
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
        />

        <TextField
          name="company"
          label="Company Name"
          value={formData.company}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
        />

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          fullWidth
        />

        <FormControlLabel
          control={
            <Checkbox
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
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
