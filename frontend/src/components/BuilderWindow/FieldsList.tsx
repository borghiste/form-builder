import React, {useState} from 'react';
import { Box, Typography, TextField, Paper, IconButton } from '@mui/material';


// COMPONENTS
import DraggableField from '../UI/DraggableField';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { selectForm  } from '../../features/formSlice';


export default function FieldsList({

  handleFieldClick,
  draggedField,
  selectedField,
  onDragOver,
  onDrop,
  handleDraggedField,
  formFields}) {

  const form = useSelector(selectForm);


  
 
  
  const [targetIndex, setTargetIndex] = useState<number | null>(null)
  const [draggedFieldIndex, setDraggedFieldIndex] = useState<number | null>(null);
  const dispatch = useDispatch();
  
 



  const handleFieldDragStart = (e, index) => {

    setDraggedFieldIndex(index);
  e.dataTransfer.setData('reorder', 'true');
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("reorder", "true");
    e.dataTransfer.setData("fieldIndex", index.toString());
  };
  


  const handleFieldDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedFieldIndex === null || draggedFieldIndex === index) return;
    setTargetIndex(index);
  };

  const handleFieldDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    onDrop(e, dropIndex);
    setTargetIndex(null);
  };

  

  const handleDeleteField = (fieldId) => {
    setFormFields(formFields.filter((f) => f.id !== fieldId));
    if (selectedField?.id === fieldId) {
      setSelectedField(null);
    }
  }
    
  return (
    <Box
    
      onDragOver={onDragOver}
      onDrop={onDrop}
      sx={{
        minHeight: '5rem',
        border: `2px dashed gray`, 
        borderRadius: '0.5rem',
        p: 3,
        transition: 'background-color 0.2s',
        display: 'flex',
        
        flexDirection: 'column',
        justifyContent: formFields?.length === 0 ? 'center' : 'flex-start',
      }}
    >
        <Box>
        <Typography variant='h4' sx={{justifySelf:'start', alignSelf:'start', textAlign:'center'}}>{form.name}</Typography>
        </Box>
      {formFields?.length === 0 ? (
        
       
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
        {formFields?.map((field, index) => (
          <>
             <Box
  onDragOver={(e) => handleFieldDragOver(e, index)}
  onDrop={(e) => handleFieldDrop(e, index)}
  sx={{
    height: targetIndex === index ? 20 : 8,
    backgroundColor: targetIndex === index ? 'primary.main' : 'transparent',
    my: 0.5,
  }}
/>
  <DraggableField
     key={`${field.id || field.type}-${index}`}
     field={field}
     selectedField={selectedField}
     handleDeleteField={handleDeleteField}
     handleFieldClick={handleFieldClick}
     index={index}
     onDragStart={(e)=> {handleFieldDragStart(e, index)}}
     onDragOver={(e)=> {e.preventDefault(); setTargetIndex(index)}}/>
  

     </>
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
                 }}>
                 Drag and drop field here to change order
               </Box>
               </>
      )}
    </Box>
    
  );
}
