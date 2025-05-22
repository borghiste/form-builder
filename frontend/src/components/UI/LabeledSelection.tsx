import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

//THIS COMPONENT CONTAINS A BASIC SELECTION MENU WITH ITS LOGIC

export default function LabeledSelection({labelName, options, selection, 
                                        setSelection,
                                        sx }) {
  // const [selection, setSelection
  // ] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    
      setSelection(event.target.value as string);
    };
   

    
    

  return (
    <Box sx={{ minWidth: '100%', height:'100%'}}>
      <FormControl fullWidth>
        <InputLabel sx={{alignItems:'center', fontSize:14, padding:0}}>{labelName}</InputLabel>
        <Select
         
          value={selection}
          sx={{height:50, alignItems:'center', display:'flex' }}
          
          onChange={handleChange}
        >
            {options.map((option) => (<MenuItem 
                                        value={option}>
                                        {option}
                                        </MenuItem>))}
        
        </Select>
      </FormControl>
    </Box>
  );
}
