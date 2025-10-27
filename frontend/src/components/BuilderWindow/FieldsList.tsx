import React, {useState} from 'react';
import { Box, Typography, TextField, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// COMPONENTS
import DraggableField from '../UI/DraggableField';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { selectForm, setFields } from '../../features/formSlice';


export default function FieldsList({

  handleFieldClick,
  handleDeleteField,
  draggedField,
  selectedField,
  onDragOver,
  onDrop,
  formFields
  
}) {

  const form = useSelector(selectForm);
 
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dispatch = useDispatch();

     const handleDragStart = (index: number) => {
     setDraggedIndex(index);
   };

   const handleDrop = (index: number) => {
     if (draggedIndex === null) return;

     const newFields = [...formFields];
     const [moved] = newFields.splice(draggedIndex, 1);
     newFields.splice(index, 0, moved);

     dispatch(setFields(newFields));
     setDraggedIndex(null);
   };
    
  return (
    <Box
      onDragOver={onDragOver}
      onDrop={onDrop}
      sx={{
        minHeight: 500,
        border: `2px dashed gray`, 
        borderRadius: '0.5rem',
        p: 3,
        transition: 'background-color 0.2s',
        display: 'flex',
        
        flexDirection: 'column',
        justifyContent: 'center'
          // formFields.length === 0 ? 'center' : 'flex-start',
      }}
    >
        <Box>
        <Typography variant='h4' sx={{justifySelf:'start', alignSelf:'start', textAlign:'center'}}>{form.name}</Typography>
        </Box>
      {formFields.length === 0 ? (
        
       
        <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          
        }}
        >
          
          <Typography variant="body1" sx={{ fontStyle: 'italic', color:'text.primary' }}>
            Drag and drop fields here to create your form
          </Typography>
          
        </Box>
      ) : (
        <>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {formFields.map((field, index) => (
             <DraggableField key={`${field.id || field.type}-${index}`} 
             field={field}
             selectedField={selectedField}
             handleDeleteField={handleDeleteField}
             handleFieldClick={ handleFieldClick}
            
             index={index}
           onDragStart={() => handleDragStart(index)}
           onDragOver={(e) => e.preventDefault()}
           onDrop={() => handleDrop(index)}/>

            
          ))}
        </Box>
        <Box
                 sx={{
                   height: 40,
                   border: "2px dashed lightgray",
                   borderRadius: 1,
                   textAlign: "center",
                   lineHeight: "40px",
                   color: "gray",
                   fontSize: 14,
                   mt: 1,
                 }}
                 onDragOver={(e) => e.preventDefault()}
                 onDrop={() => handleDrop(formFields.length)}
               >
                 Drag and drop field here to change order
               </Box>
               </>
      )}
    </Box>
    
  );
}


// import React, { useState } from "react";
// import { Card, CardContent, Typography } from "@mui/material";


// import {
//   Box,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   Card,
//   CardContent,
//   Grid,
//   Paper,
//   Button
// } from "@mui/material";

// //COMPONENTS
// import DraggableCard from "../UI/DraggableCard";
// import { useSelector } from "react-redux";

// //REDUX
// import { selectForm } from "../../features/formSlice";

// import { useDispatch } from "react-redux";
// import {setFields} from "../../features/formSlice";

// import React, { useState } from "react";
// import {
//   Box,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   Card,
//   CardContent,
//   Grid,
//   Paper,
//   Button,
//   Typography,
// } from "@mui/material";

// // COMPONENTS
// import DraggableCard from "../UI/DraggableCard";

// // REDUX
// import { useSelector, useDispatch } from "react-redux";
// import { selectForm, setFields } from "../../features/formSlice";

// export default function FormFieldList() {
//   const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
//   const dispatch = useDispatch();
//   const form = useSelector(selectForm);
//   const fields = form?.fields || [];

//   const handleDragStart = (index: number) => {
//     setDraggedIndex(index);
//   };

//   const handleDrop = (index: number) => {
//     if (draggedIndex === null) return;

//     const newFields = [...fields];
//     const [moved] = newFields.splice(draggedIndex, 1);
//     newFields.splice(index, 0, moved);

//     dispatch(setFields(newFields));
//     setDraggedIndex(null);
//   };

//   return (
//     <Box>
      
      
//       <Typography fontWeight="bold">Current fields on form</Typography>

//       {fields.map((field, index) => (
//         <DraggableCard
//           key={field.id}
//           index={index}
//           onDragStart={() => handleDragStart(index)}
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={() => handleDrop(index)}
//           field={field}
//         />
//       ))}

//       {/* empty space to drop item */}
//       <Box
//         sx={{
//           height: 40,
//           border: "2px dashed lightgray",
//           borderRadius: 1,
//           textAlign: "center",
//           lineHeight: "40px",
//           color: "gray",
//           fontSize: 14,
//           mt: 1,
//         }}
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={() => handleDrop(fields.length)}
//       >
//         Drag and drop field here to change order
//       </Box>
//     </Box>
//   );
// }

