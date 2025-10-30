import React from "react";

import { useState, useRef } from 'react';
//MUI
import { Card, CardContent, IconButton, Typography, TextField, Box, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DraggableCard({ field, 
  selectedField, 
  handleFieldClick, 
  handleDeleteField, 
  onDragStart, 
  handleDrop, 
  index,
onDragOver}) {
 


  return (
    <Card
      draggable
       
      onDragStart={onDragStart}
      
      onClick={() => handleFieldClick(field)}
      elevation={selectedField?.id === field.id ? 4 : 1}
      sx={{
      
    
        width: '100%',
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
        sx={{ position: 'relative', top: 8, right: 8, opacity: 0.6, '&:hover': { opacity: 1 } }}
      >
        <DeleteIcon fontSize="small"/>
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

    
      </CardContent>
    </Card>
  );
}
