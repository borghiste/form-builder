import React from "react";
import { TextField, Checkbox, FormControlLabel, Box, FormControl,
  FormLabel } from "@mui/material";

type FieldType = "text" | "number" | "email" | "password" | "telephone" | "select" | "checkbox" ; 

interface ValidationOptionsProps {
  fieldType: FieldType;
  validations: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

export default function ValidationOptions({
  fieldType,
  validations,
  onChange,
}):ValidationOptionsProps{
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {/* common fields options */}
      <FormControlLabel
        control={
          <Checkbox
            checked={validations.required || false}
            onChange={(e) => onChange("required", e.target.checked)}
          />
        }
        label="Required"
      />

      {/* "text" | "text Area" | "email" | "number" | "password" | "telephone"  options */}
      {(fieldType === "text" ||
        fieldType === "text Area" ||
        fieldType === "email" ||
        fieldType === "number" ||                 
        fieldType === "password" ||
        fieldType === "telephone") && (

        <>
        <FormControl sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', alignItems:'center', maxWidth:'16rem'}}>
          <FormLabel>Length:</FormLabel>
          <Box sx={{display:'flex', 
                    justifyContent:'center'}}>
         <TextField variant="outlined" size="small"
                    label="Min"  
                    type="number" 
                    value={validations.minLength || ""}
                    onChange={(e) => onChange("Min", Number(e.target.value))}
                    sx={{maxWidth:'8rem', mr:1}}/>
          
         <TextField variant="outlined" 
         size="small"  
         label="Max "
         type="number" sx={{maxWidth:'8rem'}}
         value={validations.maxLength}
         onChange={(e) => onChange("maxLength", Number(e.target.value))}/>

          </Box>

        </FormControl>
        </>

      )}

     
   

   
          
           
      

      {/* Options for Select */}
      {fieldType === "select" && (
        <>
          <TextField
            label="Min Selections"
            type="number"
            value={validations.minSelected || ""}
            onChange={(e) => onChange("minSelected", Number(e.target.value))}
          />
          <TextField
            label="Max Selections"
            type="number"
            value={validations.maxSelected || ""}
            onChange={(e) => onChange("maxSelected", Number(e.target.value))}
          />
        </>
      )}

      {/* Opzioni per Checkbox Group */}
      {fieldType === "checkbox" && (
        <>
          <TextField
            label="Min Checked"
            type="number"
            value={validations.minChecked || ""}
            onChange={(e) => onChange("minChecked", Number(e.target.value))}
          />
          <TextField
            label="Max Checked"
            type="number"
            value={validations.maxChecked || ""}
            onChange={(e) => onChange("maxChecked", Number(e.target.value))}
          />
        </>
      )}

      {/* Opzioni per Radio Group */}
      {fieldType === "radio" && (
        <p>Solo una scelta possibile (oltre a required).</p>
      )}
    </Box>
  );
};


