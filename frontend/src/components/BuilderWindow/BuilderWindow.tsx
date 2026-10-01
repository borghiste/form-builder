import React, { useMemo, useState } from 'react';
import { nanoid } from 'nanoid';

import { Box, ButtonGroup, TextField } from '@mui/material';

// Components
import BasicButton from '../UI/BasicButton';
import DropZone from './DropZone';
import FieldTypesColumn from './FieldTypesColumn';
import ValidationsPanel from './ValidationsPanel';
import FormView from '../FormView';

const DROP_EFFECTS = {
  COPY: 'copy',
  MOVE: 'move',
} as const;

type BuilderField = {
  id: string;
  label: string;
  name?: string;
  type: string;
  description?: string;
  required?: boolean;
  placeholder?: string;
  validations?: Record<string, unknown>;
  [key: string]: unknown;
};

type FieldTemplate = {
  name: string;
  type: string;
  description?: string;
  icon?: unknown;
};

export default function BuilderWindow({ handleModalClose = () => undefined }) {
  const [form, setForm] = useState({ name: '', description: '' });
  const [formFields, setFormFields] = useState<BuilderField[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [draggedField, setDraggedField] = useState<FieldTemplate | null>(null);
  const [draggedFieldIndex, setDraggedFieldIndex] = useState<number | null>(null);
  const [preview, setPreview] = useState(false);

  const selectedField = useMemo(
    () => formFields.find((field) => field.id === selectedFieldId) ?? null,
    [formFields, selectedFieldId],
  );

  const createNewFieldFromTemplate = (fieldTemplate: FieldTemplate): BuilderField => {
    const fieldData = { ...fieldTemplate };
    delete fieldData.icon;

    return {
      id: nanoid(),
      ...fieldData,
      label: `New ${fieldTemplate.name} field`,
      type: fieldTemplate.type,
      required: false,
      placeholder: '',
      description: fieldTemplate.description ?? '',
    };
  };

  const handleDragStart = (e: React.DragEvent, field: FieldTemplate) => {
    setDraggedField(field);
    setDraggedFieldIndex(null);
    e.dataTransfer.effectAllowed = DROP_EFFECTS.COPY;
    e.dataTransfer.setData('text/plain', 'new-field');
    e.dataTransfer.setData('application/json', JSON.stringify(field));
  };

  const handleFieldDragStart = (e: React.DragEvent, index: number) => {
    setDraggedField(null);
    setDraggedFieldIndex(index);
    e.dataTransfer.effectAllowed = DROP_EFFECTS.MOVE;
    e.dataTransfer.setData('text/plain', String(index));
    e.dataTransfer.setData('application/x-form-field-index', String(index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = draggedField !== null && draggedFieldIndex === null ? DROP_EFFECTS.COPY : DROP_EFFECTS.MOVE;
  };

  const cleanupDragState = () => {
    setDraggedField(null);
    setDraggedFieldIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedField !== null && draggedFieldIndex === null) {
      const newField = createNewFieldFromTemplate(draggedField);
      setFormFields((current) => {
        const next = [...current];
        const safeIndex = Math.max(0, Math.min(dropIndex, next.length));
        next.splice(safeIndex, 0, newField);
        return next;
      });
      setSelectedFieldId(newField.id);
      cleanupDragState();
      return;
    }

    if (draggedFieldIndex !== null) {
      setFormFields((current) => {
        const next = [...current];
        const from = draggedFieldIndex;
        if (from < 0 || from >= next.length) return current;

        const [movedField] = next.splice(from, 1);
        const target = Math.max(0, Math.min(dropIndex, next.length));
        const adjustedTarget = from < target ? target - 1 : target;
        next.splice(adjustedTarget, 0, movedField);
        return next;
      });
      cleanupDragState();
      return;
    }

    cleanupDragState();
  };

  const handleDragEnd = () => {
    cleanupDragState();
  };

  const handleFieldClick = (field: BuilderField) => {
    setSelectedFieldId(field.id);
  };

  const handleDeleteField = (fieldId: string) => {
    setFormFields((current) => {
      const next = current.filter((field) => field.id !== fieldId);
      if (selectedFieldId === fieldId) {
        setSelectedFieldId(next[0]?.id ?? null);
      }
      return next;
    });
  };

  const handleSelectedFieldChange = (key: string, value: string | boolean | Record<string, unknown>) => {
    if (!selectedFieldId) return;

    setFormFields((current) =>
      current.map((field) =>
        field.id === selectedFieldId ? { ...field, [key]: value } : field,
      ),
    );
  };

  const handleFormNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, name: e.target.value }));
  };

  const handleFormDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, description: e.target.value }));
  };

  const handleSaveForm = () => {
    const formToSave = { ...form, form_fields: formFields };
    console.log('Saving form', formToSave);
    handleModalClose();
  };

  const togglePreview = (isPreview: boolean) => {
    setPreview(isPreview);
  };

  return (
    <Box
      component="div"
      sx={{
        minWidth: '100%',
        minHeight: '100%',
        overflow: 'auto',
        backgroundColor: 'background.default',
        fontFamily: 'Inter, system-ui, sans-serif',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <Box
        component="main"
        sx={{
          paddingTop: '2.6rem',
          overflow: 'auto',
          maxHeight: '100vh',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <Box
          component="div"
          sx={{
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            overflow: 'auto',
          }}
        >
          <Box
            component="div"
            sx={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '2rem',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <ButtonGroup sx={{ display: 'flex', alignItems: 'center' }}>
              <BasicButton
                text="build"
                size="large"
                onClick={() => togglePreview(false)}
                textColor="black"
                variant={preview ? 'text' : 'contained'}
              />
              <BasicButton
                text="preview"
                size="large"
                onClick={() => togglePreview(true)}
                variant={preview ? 'contained' : 'text'}
                textColor={preview ? 'black' : 'text.primary'}
              />
            </ButtonGroup>

            <TextField
              type="text"
              placeholder="Insert Form Name"
              value={form.name}
              onChange={handleFormNameChange}
              sx={{
                flex: 1,
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                color: 'text.primary',
                '& .MuiInputBase-input::placeholder': {
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                },
              }}
            />

            <TextField
              type="text"
              placeholder="Insert Form description"
              value={form.description}
              onChange={handleFormDescriptionChange}
              sx={{
                flex: 1,
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                color: 'text.primary',
                '& .MuiInputBase-input::placeholder': {
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                },
              }}
            />
          </Box>

          {!preview ? (
            <Box
              component="div"
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: '1fr 2fr 1fr',
                },
                gap: '1.5rem',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <FieldTypesColumn handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />

              <DropZone
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                handleFieldClick={handleFieldClick}
                draggedField={draggedField}
                formFields={formFields}
                selectedField={selectedField}
                handleDraggedField={handleFieldDragStart}
                handleDeleteField={handleDeleteField}
              />

              <ValidationsPanel selectedField={selectedField} onFieldChange={handleSelectedFieldChange} />
            </Box>
          ) : (
            <FormView disabledFields={true} />
          )}

          <Box
            component="div"
            sx={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <ButtonGroup sx={{ p: 3 }}>
              <BasicButton
                text="save"
                size="large"
                onClick={handleSaveForm}
                variant="outlined"
                textColor={preview ? 'black' : 'text.primary'}
              />
              <BasicButton
                text="cancel"
                variant="outlined"
                textColor={preview ? 'black' : 'text.primary'}
                size="large"
                onClick={handleModalClose}
              />
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}