import React, {useState} from 'react';
import { Box, Typography} from '@mui/material';
// COMPONENTS
import DraggableCard from '../UI/DraggableCard';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { selectForm, setFormFields  } from '../../features/formSlice';

export default function FieldsList({
  handleFieldClick,
  draggedField,
  selectedField,
  onDragOver,
  onDrop,
  handleDraggedField,
  formFields,

}) {
  const dispatch = useDispatch();
  const form = useSelector(selectForm);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [draggedFieldIndex, setDraggedFieldIndex] = useState<number | null>(null);

  const handleFieldDragStart = (e, index) => {
    setDraggedFieldIndex(index);
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
    e.stopPropagation(); 
    onDrop(e, dropIndex);
    setTargetIndex(null);
    setDraggedFieldIndex(null); 
  };

  const handleDeleteField = (fieldId) => {
    dispatch(setFormFields(formFields.filter((f) => f.id !== fieldId)));
  };

  //  Gestisci il drop alla fine della lista
  const handleEndDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDrop(e, formFields.length); // Drop alla fine
    setTargetIndex(null);
    setDraggedFieldIndex(null);
  };

  return (
    <Box
      onDragOver={onDragOver}
      onDrop={handleEndDrop} 
      data-testid="fields-list"
      sx={{
        minHeight: '5rem',
       minWidth:{sm:'15rem'},
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
        <Typography variant='h4' sx={{justifySelf:'start', alignSelf:'start', textAlign:'center'}}>
          {form?.name}
        </Typography>
        <Typography sx={{justifySelf:'start', alignSelf:'start', textAlign:'center'}}>
          {form?.description}
        </Typography>
      </Box>

      {formFields?.length === 0 ? (
        <Box
          sx={{
            height: '100%',
            maxWidth:'100%',
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
              <React.Fragment key={`${field.id}`}>
                {/* Drop zone */}
                <Box
                data-testid={`field-${field.id}`}
                  onDragOver={(e) => handleFieldDragOver(e, index)}
                  onDrop={(e) => handleFieldDrop(e, index)}
                  sx={{
                    height: targetIndex === index ? 20 : 10, 
                    backgroundColor: targetIndex === index ? 'cyan.main' : 'transparent',
                    borderradius: 8,
                    transition: 'all 0.2s'
                  }}
                />
                <DraggableCard
                
                  field={field}
                  selectedField={selectedField}
                  handleDeleteField={handleDeleteField}
                  handleFieldClick={handleFieldClick}
                  index={index}
                  onDragStart={(e) => handleFieldDragStart(e, index)}
                  onDragOver={(e) => e.preventDefault()}
                />
              </React.Fragment>
            ))}
          </Box>

          {/* Drop zone finale */}
          <Box
            onDragOver={(e) => {e.preventDefault(); setTargetIndex(formFields.length); }}
            onDrop={handleEndDrop}
            sx={{
              minHeight: targetIndex === formFields.length ? '4rem' : '3rem',
              border: "2px dashed lightgray",
              borderRadius: 1,
              textAlign: "center",
              lineHeight: "40px",
              color: "gray",
              fontSize: 14,
              mt: 1,
              backgroundColor: targetIndex === formFields.length ? 'cyan.main' : 'transparent',
              transition: 'all 0.2s'
            }}
          >
            <Typography color='text.primary'>

            Drag and Drop fields here to add at the end
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}