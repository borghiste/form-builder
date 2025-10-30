import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  TextField,
  Button,
} from '@mui/material';

interface Validation {
  fieldType: string;
  required: boolean;
  customValidation: string;
}

interface Props {
  selectedField: boolean;
  validation: Validation;
  setValidation: React.Dispatch<React.SetStateAction<Validation>>;
}

const ValidationPanel: React.FC<Props> = ({ selectedField, validation, setValidation }) => {
  return (
    <Box>
      <Typography variant="h6" mb={2} fontWeight={600}>
        Set Validations
      </Typography>

      {selectedField ? (
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Field Type */}
          <FormControl fullWidth>
            <InputLabel id="field-type-label">Field Type</InputLabel>
            <Select
              labelId="field-type-label"
              // value={validation.fieldType}
              label="Field Type"
              // onChange={(e) => setValidation({ ...validation, fieldType: e.target.value })}
            >
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="telephone">Telephone</MenuItem>
              <MenuItem value="date">Date</MenuItem>
            </Select>
          </FormControl>

          {/* Required Field */}
          <FormControlLabel
            control={
              <Switch
                // checked={validation.required}
                onChange={(e) => setValidation({ ...validation, required: e.target.checked })}
                color="primary"
              />
            }
            label="Required field"
          />

          {/* Custom Validations */}
          <TextField
            label="Custom Validations"
            multiline
            rows={3}
            // value={validation.customValidation}
            // onChange={(e) => setValidation({ ...validation, customValidation: e.target.value })}
            fullWidth
            variant="outlined"
          />

          {/* Apply Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ fontWeight: 600 }}
          >
            APPLY
          </Button>
        </Box>
      ) : (
        <Typography textAlign="center" mt={4}>
          Select a field to edit validations
        </Typography>
      )}
    </Box>
  );
};

export default ValidationPanel;
