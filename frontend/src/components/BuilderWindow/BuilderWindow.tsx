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

} from '../../stores/index';

//utils
import handleModalClose from '../../utils/handleModalClose';
import handleSaveForm from '../../utils/handleSaveForm';


const DROP_EFFECTS = {
  COPY: 'copy',
  MOVE: 'move',
} as const;

export default function BuilderWindow() {
  const formName = useFormBuilderStore((state) => state.formName);
  const formDescription = useFormBuilderStore((state) => state.formDescription);
  const formFields = useFormBuilderStore((state) => state.formFields);
  const selectedForm = useFormListStore((state) => state.selectedForm);
  const [SaveError, setSaveError] = useState<string | null>(null);
  
  const selectedFieldId = useFormBuilderStore(
    (state) => state.selectedFieldId,
  );

  const initializeForm = useFormBuilderStore((state) => state.initializeForm);
  const startTemplateDrag = useFormBuilderStore(
    (state) => state.startTemplateDrag,
  );

  const clearDragState = useFormBuilderStore((state) => state.clearDragState);


  const updateField = useFormBuilderStore((state) => state.updateField);
 
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    initializeForm(selectedForm);
  }, [initializeForm, selectedForm]);

  const selectedField = useMemo(
    () => formFields?.find((field) => field.id === selectedFieldId) ?? null,
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







  const handleDragEnd = () => {
    clearDragState();
  };






  const handleFormNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    useFormBuilderStore.getState().setFormName(e.target.value)
  };

  const handleFormDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    useFormBuilderStore.getState().setFormDescription(e.target.value)
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
              value={formName}
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
              value={formDescription}
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
                handleDragStart={handleDragStart} />

              <DropZone />

              <ValidationsPanel/>
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
                onClick={() => {
                  void handleSaveForm({ setSaveError });
                }}
                variant='outlined'
                textColor={preview ? 'black' : 'text.primary'}/>
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

