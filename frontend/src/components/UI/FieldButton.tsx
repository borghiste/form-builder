import React from "react";
//MUI
import { Box, Typography, Paper } from "@mui/material";

export default function FieldButton({handleDragStart, field, Icon, name}) {
  return(
    <Paper
                  
                  draggable
                  onDragStart={(e) => handleDragStart(e, field)}
                  onMouseDown={(e) => (e.currentTarget.style.cursor = 'grabbing')}
                  onMouseUp={(e) => (e.currentTarget.style.cursor = 'grab')}
                  sx={{
                      p: '0.75rem 1rem',
                      
                      borderRadius: '0.375rem',
                      cursor: 'grab',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      
                      transition: 'background-color 0.2s ease',
                      // '&:hover': {
                      //     bgcolor: '#4B5563' 
                      //   },
                    }}
                    >
                  {Icon} 
                  <Typography>{name}</Typography>
                </Paper>
            
  )
}