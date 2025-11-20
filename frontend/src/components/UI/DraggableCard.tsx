import React, { useState } from "react";
/// MUI
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  TextField,
  Box,
  FormControl,
  Checkbox,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { selectFields } from "../../features/fieldSlice";

type Field = { id: string; label: string; required?: boolean };

type DraggableCardProps = {
  field: Field;
  selectedField: { id: string } | null;
  handleFieldClick: (field: Field) => void;
  handleDeleteField: (id: string) => void;
  onDragStart?: React.DragEventHandler<HTMLDivElement>;
  onDragOver?: React.DragEventHandler<HTMLDivElement>;
  handleDrop?: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  index?: number;
};

export default function DraggableCard({
  field,
  selectedField,
  handleFieldClick,
  handleDeleteField,
  onDragStart,
  onDragOver,
  handleDrop,
}: DraggableCardProps) {
  
  const dispatch = useDispatch();
  const fieldState = useSelector(selectFields);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalLabel(e.target.value);
  };

  const handleLabelSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(setFieldLabel(localLabel));
    

      setLabelIsClicked(false);
    }
  };

  return (
    <Card
      draggable
      onDragStart={onDragStart}
      onClick={() => handleFieldClick(field)}
      elevation={selectedField?.id === field.id ? 4 : 1}
      sx={{
        width: "100%",
        cursor: "grab",
        borderRadius: 2,
        backgroundColor: "background.default",
        p: 2,
        "&:hover": { boxShadow: 3 },
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        
      <FormControl>
 
               
                    <>
                   <Typography
                   component="label"
                   sx={{
                     display: "block",
                     fontSize: 14,
                     fontWeight: 500,
                     mb: 1,
                     zIndex: 9,
                     
                    }}>
                     {field.label}
                     {!!field.required && (
                       <Box component="span" sx={{ color: "red" }}>
                          *
                       </Box>
                     )}
                   </Typography>

                   {['text', 'text area', 'email', 'number', 'phone', 'password', 'time', 'date'].includes(field.type) && ( <TextField type={field.type} disabled label={field.label}/>)}

                   {field.type == 'selectlist' && (
                   <FormControl fullWidth>
                   <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>
                   <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                    
                     label={field.label}>
                     <MenuItem value={10}></MenuItem>
                     <MenuItem value={20}></MenuItem>
                     <MenuItem value={30}>Thirty</MenuItem>
                   </Select>
                 </FormControl> 
                   )
                   }
               

                   {
                   field.type == 'checkbox' && <FormControlLabel control={<Checkbox defaultChecked disabled />} label={ field.label} />
                   }
                     </>
                  
            

            </FormControl>
            <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteField(field.id);
          }}
        >
          <DeleteIcon fontSize="medium" sx={{"&:hover": {color:'magenta.dark'}}} />
        </IconButton> 

        
      </CardContent>
    </Card>
  );
}
