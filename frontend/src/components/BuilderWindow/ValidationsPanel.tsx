import React from 'react';

import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

type BuilderField = {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  validations?: Record<string, unknown>;
  [key: string]: unknown;
};

type ValidationPanelProps = {
  selectedField: BuilderField | null;
  onFieldChange: (key: string, value: string | boolean | Record<string, unknown>) => void;
};

export default function ValidationPanel({ selectedField, onFieldChange }: ValidationPanelProps) {
  if (!selectedField) {
    return (
      <Typography textAlign="center" mt={4}>
        Select a field to edit validations
      </Typography>
    );
  }

  const fieldType = selectedField.type;

  return (
    <Box>
      <Typography variant="h6" mb={2} fontWeight={600}>
        Set Validations
      </Typography>

      <Box display="flex" flexDirection="column" gap={3}>
        <FormControl fullWidth>
          <InputLabel id="field-type-label">Field Type</InputLabel>
          <Select
            labelId="field-type-label"
            value={fieldType}
            onChange={(e) => onFieldChange('type', e.target.value)}
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="textarea">Text area</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="number">Number</MenuItem>
            <MenuItem value="phone">Phone</MenuItem>
            <MenuItem value="password">Password</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="time">Time</MenuItem>
            <MenuItem value="select">Select</MenuItem>
            <MenuItem value="checkbox">Checkbox</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Field Label"
          type="text"
          value={selectedField.label}
          onChange={(e) => onFieldChange('label', e.target.value)}
          fullWidth
        />

        <TextField
          label="Placeholder"
          type="text"
          value={selectedField.placeholder ?? ''}
          onChange={(e) => onFieldChange('placeholder', e.target.value)}
          fullWidth
        />

        <FormControlLabel
          control={
            <Switch
              checked={Boolean(selectedField.required)}
              onChange={(e) => onFieldChange('required', e.target.checked)}
              color="primary"
            />
          }
          label="Required field"
        />

        {['text', 'textarea', 'number', 'email', 'phone', 'password'].includes(fieldType) && (
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
            <TextField
              label="Min length"
              type="number"
              value={Number(selectedField.validations?.minLength ?? '') || ''}
              onChange={(e) =>
                onFieldChange('validations', {
                  ...(selectedField.validations ?? {}),
                  minLength: Number(e.target.value),
                })
              }
            />
            <TextField
              label="Max length"
              type="number"
              value={Number(selectedField.validations?.maxLength ?? '') || ''}
              onChange={(e) =>
                onFieldChange('validations', {
                  ...(selectedField.validations ?? {}),
                  maxLength: Number(e.target.value),
                })
              }
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
