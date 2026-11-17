import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import DraggableCard from '../UI/DraggableCard';

// store
import { useFormBuilderStore } from '../../stores/index';

// utils
import useBuilderDragAndDrop from '../../utils/useBuilderDragAndDrop';

type FieldItem = {
  id: string | number;
  label: string;
  type: string;
  required?: boolean;
  [key: string]: unknown;
};

type FieldsListProps = {
  handleFieldClick: (field: FieldItem) => void;
  selectedField: FieldItem | null;
  handleDeleteField: (fieldId: string | number) => void;
};

export default function DropZone() {
  const { handleFieldDragStart, handleDragOver, handleDrop, handleDragEnd } =
    useBuilderDragAndDrop();

  const [targetIndex, setTargetIndex] = useState<number | null>(null);

  
  const formFields = useFormBuilderStore((state) => state.formFields);
  const formName = useFormBuilderStore((state) => state.formName);
  const formDescription = useFormBuilderStore.getState().formDescription
  const draggedFieldIndex = useFormBuilderStore(
    (state) => state.draggedFieldIndex,
  );

  const handleFieldDragOver = (e: React.DragEvent, index: number) => {
    handleDragOver(e);
    if (draggedFieldIndex === null || draggedFieldIndex === index) return;
    setTargetIndex(index);
  };


  const handleFieldDrop = (e: React.DragEvent, dropIndex: number) => {
    handleDrop(e, dropIndex);
    setTargetIndex(null);
  };

  const handleFieldDragEnd = () => {
    setTargetIndex(null);
    handleDragEnd();
  };

  return (
    <Box
      onDragOver={handleDragOver}
      onDrop={(e) => handleFieldDrop(e, formFields.length)}
      onDragEnd={handleFieldDragEnd}
      data-testid='fields-list'
      sx={{
        minHeight: '5rem',
        minWidth: { sm: '15rem' },
        border: '2px dashed gray',
        borderRadius: '0.5rem',
        p: 3,
        transition: 'background-color 0.2s',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: formFields.length === 0 ? 'center' : 'flex-start',
      }}
    >
      <Typography>{formName}</Typography>
      <Typography>{formDescription}</Typography>

      {formFields.length === 0 ? (
        <Box
          sx={{
            height: '100%',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant='body1'
            sx={{ fontStyle: 'italic', color: 'text.primary' }}
          >
            Drag and drop fields here to create your form
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {formFields.map((field, index) => (
              <React.Fragment key={field.id}>
                {/* Drop zone tra i campi */}
                <Box
                  data-testid={`field-${field.id}`}
                  onDragOver={(e) => handleFieldDragOver(e, index)}
                  onDrop={(e) => handleFieldDrop(e, index)}
                  sx={{
                    height: targetIndex === index ? 20 : 10,
                    backgroundColor:
                      targetIndex === index ? 'primary.main' : 'transparent',
                    borderRadius: 2,
                    transition: 'all 0.2s',
                  }}
                />
                <DraggableCard
                  field={field}

                  index={index}
                  onDragStart={(e) => handleFieldDragStart(e, index)}
                  onDragOver={(e) => e.preventDefault()}
                />
              </React.Fragment>
            ))}
          </Box>

          {/* Drop zone finale */}
          <Box
            onDragOver={(e) => {
              handleDragOver(e);
              setTargetIndex(formFields.length);
            }}
            onDrop={(e) => handleFieldDrop(e, formFields.length)}
            sx={{
              minHeight: targetIndex === formFields.length ? '4rem' : '3rem',
              border: '2px dashed lightgray',
              borderRadius: 1,
              textAlign: 'center',
              lineHeight: '40px',
              color: 'gray',
              fontSize: 14,
              mt: 1,
              backgroundColor:
                targetIndex === formFields.length
                  ? 'primary.main'
                  : 'transparent',
              transition: 'all 0.2s',
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