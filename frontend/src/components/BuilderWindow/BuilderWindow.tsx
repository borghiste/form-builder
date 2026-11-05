import React, { useEffect, useMemo, useState } from 'react';

import { Box, ButtonGroup, TextField } from '@mui/material';

// Components
import BasicButton from '../UI/BasicButton';
import DropZone from './DropZone';
import FieldTypesColumn from './FieldTypesColumn';
import ValidationsPanel from './ValidationsPanel';
import FormView from '../FormView';

// store
import {
  type FieldTemplate,
  useFormBuilderStore,
  useFormListStore,
  useNewFormStore,
} from '../../stores/index';

//utils
import handleModalClose from '../../utils/handleModalClose';
import { handleSaveNewForm } from '../../utils/handleSaveNewForm';

const DROP_EFFECTS = {
  COPY: 'copy',
  MOVE: 'move',
} as const;

export default function BuilderWindow() {
  // new form state
  const {form_name, setForm, form_description} = useNewFormStore();
  const {formFields}= useFormBuilderStore();
  const newForm = {
    name: form_name,
    description: form_description,
    form_fields: (formFields ?? []).map(({ label, type, required }) => ({
      label,
      type,
      required,
    })),
  };

  const { selectedForm } = useFormListStore();
  const [SaveError, setSaveError] = useState<string | null>(null);
  
  const selectedFieldId = useFormBuilderStore(
    (state) => state.selectedFieldId,
  );
  const draggedField = useFormBuilderStore((state) => state.draggedField);
  const draggedFieldIndex = useFormBuilderStore(
    (state) => state.draggedFieldIndex,
  );
  const initializeFormFields = useFormBuilderStore(
    (state) => state.initializeFormFields,
  );
  const startTemplateDrag = useFormBuilderStore(
    (state) => state.startTemplateDrag,
  );
  const startFieldDrag = useFormBuilderStore((state) => state.startFieldDrag);
  const dropField = useFormBuilderStore((state) => state.dropField);
  const clearDragState = useFormBuilderStore((state) => state.clearDragState);
  const setSelectedFieldId = useFormBuilderStore(
    (state) => state.setSelectedFieldId,
  );
  const updateField = useFormBuilderStore((state) => state.updateField);
  const deleteField = useFormBuilderStore((state) => state.deleteField);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    initializeFormFields(selectedForm?.form_fields ?? []);
  }, [initializeFormFields, selectedForm]);

  const selectedField = useMemo(
    () => formFields.find((field) => field.id === selectedFieldId) ?? null,
    [formFields, selectedFieldId],
  );

  const handleDragStart = (
    e: React.DragEvent,
    field: FieldTemplate,
  ) => {
    startTemplateDrag(field);
    e.dataTransfer.effectAllowed = DROP_EFFECTS.COPY;
    e.dataTransfer.setData('text/plain', 'new-field');
    e.dataTransfer.setData('application/json', JSON.stringify(field));
  };

  const handleFieldDragStart = (e: React.DragEvent, index: number) => {
    startFieldDrag(index);
    e.dataTransfer.effectAllowed = DROP_EFFECTS.MOVE;
    e.dataTransfer.setData('text/plain', String(index));
    e.dataTransfer.setData('application/x-form-field-index', String(index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect =
      draggedField !== null && draggedFieldIndex === null
        ? DROP_EFFECTS.COPY
        : DROP_EFFECTS.MOVE;
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    dropField(dropIndex);
  };

  const handleDragEnd = () => {
    clearDragState();
  };

  const handleFieldClick = (field: { id: string | number }) => {
    setSelectedFieldId(field.id);
  };

  const handleDeleteField = (fieldId: string | number) => {
    deleteField(fieldId);
  };

  const handleSelectedFieldChange = (
    key: string,
    value: string | boolean | Record<string, unknown>,
  ) => {
    if (selectedFieldId === null) return;
    updateField(selectedFieldId, key, value);
  };

  const handleFormNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    useNewFormStore.setState((current) => ({
      ...current,
      form_name: e.target.value,
    }));
  };

  const handleFormDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    useNewFormStore.setState((current) => ({
      ...current,
      form_description: e.target.value,
    }));
  };
  const togglePreview = (isPreview: boolean) => {
    setPreview(isPreview);
  };

  return (
    <Box
      component='div'
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
        component='main'
        sx={{
          paddingTop: '1.6rem',
          overflow: 'auto',
          maxHeight: '90vh',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <BasicButton
            text='x'
            color='magenta.main'
            onClick={handleModalClose}
          />
        </Box>
        <Box
          component='div'
          sx={{
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            overflow: 'auto',
          }}
        >
          <Box
            component='div'
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
                text='build'
                size='large'
                onClick={() => togglePreview(false)}
                textColor='black'
                variant={preview ? 'text' : 'contained'}
              />
              <BasicButton
                text='preview'
                size='large'
                onClick={() => togglePreview(true)}
                variant={preview ? 'contained' : 'text'}
                textColor={preview ? 'black' : 'text.primary'}
              />
            </ButtonGroup>

            <TextField
              type='text'
              placeholder='Insert Form Name'
             
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
              type='text'
              placeholder='Insert Form description'
              value={form_description}
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
              component='div'
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
              <FieldTypesColumn
                handleDragStart={handleDragStart}
                handleDragEnd={handleDragEnd}
              />

              <DropZone
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                handleFieldClick={handleFieldClick}
                formFields={formFields}
                selectedField={selectedField}
                handleDraggedField={handleFieldDragStart}
                handleDeleteField={handleDeleteField}
              />

              <ValidationsPanel
                selectedField={selectedField}
                onFieldChange={handleSelectedFieldChange}
              />
            </Box>
          ) : (
            <FormView disabledFields={ true} />
          )}

          <Box
            component='div'
            sx={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <ButtonGroup sx={{ p: 3 }}>
              <BasicButton
                text='save'
                size='large'
               onClick={async () => {
  try {
    await handleSaveNewForm(newForm);
  } catch (error) {
    setSaveError(error instanceof Error ? error.message : 'Errore');
  }
}}
                variant='outlined'
                textColor={preview ? 'black' : 'text.primary'}
              />
              <BasicButton
                text='cancel'
                variant='outlined'
                textColor={preview ? 'black' : 'text.primary'}
                size='large'
                onClick={handleModalClose}
              />
            </ButtonGroup>
          </Box>
            {SaveError && (
              <Box
                component='div'
                sx={{
                  color: 'error.main',
                  fontSize: '1rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  
                  
                }}
              >
                {SaveError}
              </Box>
            )}
        </Box>
      </Box>
    </Box>
  );
}
