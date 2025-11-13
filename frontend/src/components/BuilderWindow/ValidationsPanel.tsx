import React, { useState } from 'react';
//MUI
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
  FormLabel
} from '@mui/material';
//REDUX
import{ setFieldType, selectFields, setFields} from '../../features/FieldSlice';
import { useDispatch, useSelector } from 'react-redux';

interface Validation {
  fieldType: string;
  required: boolean;
  customValidation: string;
}

interface Props {
  
  validations: Validation;
  setValidation: React.Dispatch<React.SetStateAction<Validation>>;
}

 export default function  ValidationPanel({selectedField, validations}) {
  
  const dispatch = useDispatch();
  
  
  const [localLabel, SetLocalLabel] = useState('')
  

  return (
    <Box>
      <Typography variant="h6" mb={2} fontWeight={600}>
        Set Validations
      </Typography>
      
      {selectedField ? (
        
        
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Field Type */}
          <FormControl fullWidth>
             {/* <InputLabel id="field-type-label">Field Type</InputLabel>  */}
            {/* <Select
              labelId="field-type-label"
              value={fieldType}>
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="text area">Text area</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="telephone">Telephone</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              </Select> */}
          </FormControl>
              {/* edit field label */}
          <TextField 
          type='text'
        
          
          />

          {/* Required Field */}
          <FormControlLabel
          
            control={
              <Switch
                // checked={validation.required}
                onChange={(e) => setValidations({ ...validations,required: e.target.checked })}
                color="primary"/>
            }
            label="Required field"
          />
          
          { [ 'text','text area', 'number', 'email', 'phone'].includes(fieldType) && (<FormControl sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', alignItems:'center', maxWidth:'16rem'}}>
          <FormLabel>Length: </FormLabel>
          <Box sx={{display:'flex', 
                    justifyContent:'center'}}>
         <TextField variant="outlined" size="small"
                    label="Min"  
                    type="number" 
                    // value={validations.minLength || ""}
                    onChange={(e) => onChange("Min", Number(e.target.value))}
                    sx={{maxWidth:'8rem', mr:1}}/>
          
         <TextField variant="outlined" 
         size="small"  
         label="Max "
         type="number" sx={{maxWidth:'8rem'}}
        //  value={validations.maxLength}
         onChange={(e) => onChange("maxLength", Number(e.target.value))}/>

          </Box>

        </FormControl>)
           }

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
            onClick={() => {setValidations({label: localLabel})}}
            fullWidth
            sx={{ fontWeight: 600 }}>
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


