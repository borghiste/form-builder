import React from "react";

import { useState, useRef } from 'react';
//MUI
import { Card, CardContent, IconButton, Typography, TextField, Box, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function DraggableCard({ field, selectedField, handleFieldClick, handleDeleteField, 
  onDragStart, onDrop}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    draggingRef.current = true;
    offsetRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingRef.current) return;
    setPosition({
      x: e.clientX - offsetRef.current.x,
      y: e.clientY - offsetRef.current.y,
    });
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
  };

 
  useState(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <Card
      onMouseDown={handleMouseDown}
      onClick={() => handleFieldClick(field)}
      elevation={selectedField?.id === field.id ? 4 : 1}
      sx={{
        position: 'relative',
        left: position.x,
        top: position.y,
        width: 250,
        cursor: 'grab',
        borderRadius: 2,
        p: 2,
        '&:hover': { boxShadow: 3 },
      }}
    >
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteField(field.id);
        }}
        sx={{ position: 'absolute', top: 8, right: 8, opacity: 0.6, '&:hover': { opacity: 1 } }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>

      <CardContent sx={{ p: 0 }}>
        {/* asterisk that indicated if field is required */}
        <Typography component="label" sx={{ display: 'block', fontSize: 14, fontWeight: 500, mb: 1 }}>
          {field.label} {field.required && <Box component="span" sx={{ color: 'red' }}>*</Box>}
        </Typography>
        
        {field.type === 'checkbox' && (
          <Checkbox/>
        ) 
        }

        {/* <TextField
          fullWidth
          type={field.type}
          placeholder={field.placeholder}
          size="small"
          variant="outlined"
        /> */}
      </CardContent>
    </Card>
  );
}

export default DraggableCard;

// import React from "react";
// //MUI
// import { Box, Typography, TextField, Paper, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// export default function DraggableField({handleFieldClick,
//     selectedField,
//     handleDeleteField,
//     field}){

// return(
// <Paper

// key={field.id}
// onClick={() => handleFieldClick(field)}
// elevation={selectedField?.id === field.id ? 4 : 1}
// sx={{
//   p: 2,
//   position: 'relative',
//   bgcolor: 'background.paper',
   
      
 
//   borderRadius: '0.5rem',
//   cursor: 'pointer',
//   transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
//   '&:hover': {
//     boxShadow: 3,
//   },
// }}
// >
// {/* Pulsante elimina */}
// <IconButton
//   size="small"
//   onClick={(e) => {
//     e.stopPropagation();
//     handleDeleteField(field.id);
//   }}
//   sx={{
//     position: 'absolute',
//     top: '0.5rem',
//     right: '0.5rem',
//     opacity: 0.6,
//     '&:hover': {
//       opacity: 1,
//     },
//   }}
// >
//   <DeleteIcon fontSize="small" />
// </IconButton>

// {/* label */}
// <Typography
//   component="label"
//   sx={{
//     display: 'block',
//     fontSize: '0.875rem',
//     fontWeight: 500,
//     color: 'text.primary',
//     mb: 1,
//   }}
// >
//   {field.label}{' '}
//   {field.required && (
//     <Box component="span" sx={{ color: 'red' }}>
//       *
//     </Box>
//   )}
// </Typography>

// {/* Input */}
// <TextField
//   fullWidth
//   type={field.type}
//   placeholder={field.placeholder}
//   size="small"
//   variant="outlined"
//   sx={{
//     input: {
      
//       borderRadius: '0.375rem',
//     },
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
        
//       },
//       '&:hover fieldset': {
//         borderColor: 'gray.main',
//       },
//     },
//   }}
// />
// </Paper>
// )
// }