import React from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../features/formSlice";
import { selectField } from "../../features/fieldSlice";
import {formField } from '../../features/formSlice'

// MUI
import { TextField, 
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Button,
  FormLabel
} from "@mui/material";

export default function ValidationPanel() {
  const dispatch = useDispatch();
  const selectedField = useSelector(selectField);
  

  if (!selectedField) {
    return (
      <Typography textAlign="center" mt={4}>
        Select a field to edit validations
      </Typography>
    );
  }

  const fieldType = selectedField.type;

  // field changes global function
  const handleFieldChange = (key: keyof formField, value: any) => {
    dispatch(updateField({
      id: selectedField.id,
      changes: { [key]: value }
    }));
  };

  return (
  
    <Box>
      <Typography variant="h6" mb={2} fontWeight={600}>
        Set Validations
      </Typography>
    
      <Box display="flex" flexDirection="column" gap={3}>
        {/* Field Type */}
        <FormControl fullWidth>
          <InputLabel id="field-type-label">Field Type</InputLabel>
          <Select
            labelId="field-type-label"
            value={selectedField.type}
            onChange={(e) => handleFieldChange('type', e.target.value)}
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="text area">Text area</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="number">Number</MenuItem>
            <MenuItem value="telephone">Telephone</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="time">Time</MenuItem>
          </Select>
        </FormControl>

        {/* Field Label */}
        <TextField
          label="Field Label"
          type="text"
          
          onChange={(e) => handleFieldChange('label', e.target.value)}
          fullWidth
        />

        {/* Required Field */}
        <FormControlLabel
          control={
            <Switch
            
              onChange={(e) =>
                handleFieldChange('required', e.target.checked)}
              
              color="primary"
            />
          }
          label="Required field"
        />

        {/* Length Validations */}
        {['text', 'text area', 'number', 'email', 'telephone'].includes(fieldType) && (
          <FormControl
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              maxWidth: '16rem',
            }}
          >
            <FormLabel>Length:</FormLabel>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                variant="outlined"
                size="small"
                label="Min"
                type="number"
                value={selectedField.validations?.minLength || ''}
                onChange={(e) =>
                  handleFieldChange('validations', {
                    ...selectedField.validations,
                    minLength: Number(e.target.value),
                  })
                }
                sx={{ maxWidth: '8rem', mr: 1 }}
              />
              <TextField
                variant="outlined"
                size="small"
                label="Max"
                type="number"
                value={selectedField.validations?.maxLength || ''}
                onChange={(e) =>
                  handleFieldChange('validations', {
                    ...selectedField.validations,
                    maxLength: Number(e.target.value),
                  })
                }
                sx={{ maxWidth: '8rem' }}
              />
            </Box>
          </FormControl>
        )}

        {/* Custom Validations */}
        <TextField
          label="Custom Validations"
          multiline
          rows={3}
          value={selectedField.validations?.customValidation || ''}
          onChange={(e) =>
            handleFieldChange('validations', {
              ...selectedField.validations,
              customValidation: e.target.value,
            })
          }
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
    </Box>
        );
}
