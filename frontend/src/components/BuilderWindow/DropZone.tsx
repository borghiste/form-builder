import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import DraggableCard from '../UI/DraggableCard';

// store
import { useFormBuilderStore, useNewFormStore } from '../../stores/index';

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
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, dropIndex: number) => void;
  onDragEnd: () => void;
  handleDraggedField: (e: React.DragEvent, index: number) => void;
  handleDeleteField: (fieldId: string | number) => void;
  formFields: FieldItem[];
};

export default function FieldsList({
  handleFieldClick,
  selectedField,
  onDragOver,
  onDrop,
  onDragEnd,
  handleDraggedField,
  handleDeleteField,
  formFields,
}: FieldsListProps) {
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const draggedFieldIndex = useFormBuilderStore(
    (state) => state.draggedFieldIndex,
  );
  const form_name = useNewFormStore((state) => state.form_name);

  const handleFieldDragStart = (e: React.DragEvent, index: number) => {
    handleDraggedField(e, index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('reorder', 'true');
    e.dataTransfer.setData('fieldIndex', index.toString());
  };

  const handleFieldDragEnd = () => {
    setTargetIndex(null);
    onDragEnd();
  };

  const handleFieldDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedFieldIndex === null || draggedFieldIndex === index) return;
    setTargetIndex(index);
  };

  // Handle dropping a field at a specific index
  const handleFieldDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    onDrop(e, dropIndex);
    setTargetIndex(null);
  };

  // Handle dropping a field at the end of the list
  const handleEndDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDrop(e, formFields.length);
    setTargetIndex(null);
  };

  return (
    <Box
      onDragOver={onDragOver}
      onDrop={handleEndDrop}
      onDragEnd={handleFieldDragEnd}
      data-testid='fields-list'
      sx={{
        minHeight: '5rem',
        minWidth: { sm: '15rem' },
        border: `2px dashed gray`,
        borderRadius: '0.5rem',
        p: 3,
        transition: 'background-color 0.2s',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: formFields?.length === 0 ? 'center' : 'flex-start',
      }}
    >

      {/* form name */}
      <Typography sx={{}}>{form_name}</Typography>
      {formFields?.length === 0 ? (
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
            {formFields?.map((field, index) => (
              <React.Fragment key={`${field.id}`}>
                {/* Drop zone */}
                <Box
                  data-testid={`field-${field.id}`}
                  onDragOver={(e) => handleFieldDragOver(e, index)}
                  onDrop={(e) => handleFieldDrop(e, index)}
                  sx={{
                    height: targetIndex === index ? 20 : 10,
                    backgroundColor:
                      targetIndex === index ? 'cyan.main' : 'transparent',
                    borderradius: 8,
                    transition: 'all 0.2s',
                  }}
                />
                <DraggableCard
                  field={field as any}
                  selectedField={selectedField as any}
                  handleDeleteField={handleDeleteField}
                  handleFieldClick={(item) => handleFieldClick(item as any)}
                  index={index}
                  onDragStart={(e) => handleFieldDragStart(e, index)}
                  onDragOver={(e) => e.preventDefault()}
                />
              </React.Fragment>
            ))}
          </Box>


          {/* Drop zone  */}
          <Box
            onDragOver={(e) => {
              e.preventDefault();
              setTargetIndex(formFields.length);
            }}
            onDrop={handleEndDrop}
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
                targetIndex === formFields.length ? 'cyan.main' : 'transparent',
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
