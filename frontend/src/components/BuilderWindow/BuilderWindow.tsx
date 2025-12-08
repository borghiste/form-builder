import React, { useState, useContext } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { Box, ButtonGroup, TextField } from '@mui/material';

// Context
import { modalContext } from '../../App';

// Redux
import { selectForm, setForm, addField } from '../../features/formSlice';
import { createNewForm, updateForm } from '../../features/formsListSlice';
import { setField, selectField } from '../../features/fieldSlice';

// Components
import BasicButton from '../UI/BasicButton';
import DropZone from './DropZone';
import FieldTypesColumn from './FieldTypesColumn';
import ValidationsPanel from './ValidationsPanel';
import FormView from '../FormView';

// Constants
const DROP_EFFECTS = {
  COPY: 'copy',
  MOVE: 'move'
};

const DRAG_DATA_KEYS = {
  FIELD_INDEX: 'fieldIndex',
  REORDER: 'reorder',
  NEW_FIELD: 'newField'
};

const CONTEXT_TYPES = {
  NEW_FORM: 'newForm',
  EDITING: 'editing'
};

export default function BuilderWindow({ handleModalClose }) {
  // Redux state
  const dispatch = useDispatch();
  const form = useSelector(selectForm);
  const selectedField = useSelector(selectField);
  const formFields = form?.form_fields || [];

  // Context
  const { context } = useContext(modalContext);

  // Local state
  const [draggedField, setDraggedField] = useState(null);
  const [draggedFieldIndex, setDraggedFieldIndex] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);
  const [preview, setPreview] = useState(false);

  // ============ DRAG AND DROP HANDLERS ============

  /**
   * Handles drag start for new field types from the column
   */
  const handleDragStart = (e, field) => {
    setDraggedField(field);
    e.dataTransfer.effectAllowed = DROP_EFFECTS.COPY;
    e.dataTransfer.setData(DRAG_DATA_KEYS.NEW_FIELD, 'true');
  };

  /**
   * Handles drag start for existing fields (reordering)
   */
  const handleFieldDragStart = (e, index) => {
    setDraggedFieldIndex(index);
    e.dataTransfer.effectAllowed = DROP_EFFECTS.MOVE;
    e.dataTransfer.setData(DRAG_DATA_KEYS.FIELD_INDEX, index.toString());
  };

  /**
   * Allows drop by preventing default and setting effect
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    const isNewField = e.dataTransfer.getData(DRAG_DATA_KEYS.NEW_FIELD);
    e.dataTransfer.dropEffect = isNewField ? DROP_EFFECTS.COPY : DROP_EFFECTS.MOVE;
  };

  /**
   * Handles field drop - either adds new field or reorders existing
   */
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();

    const fieldIndex = e.dataTransfer.getData(DRAG_DATA_KEYS.FIELD_INDEX);
    const isReorder = e.dataTransfer.getData(DRAG_DATA_KEYS.REORDER);
    const isNewField = e.dataTransfer.getData(DRAG_DATA_KEYS.NEW_FIELD);

    const updatedFields = [...formFields];

    if (isNewField && draggedField) {
      // Add new field
      const newField = createNewFieldFromTemplate(draggedField);
    
      dispatch(addField({ form_fields: newField }));
      updatedFields.push(newField);
    } else if (isReorder && fieldIndex !== '') {
      // Reorder existing field
      const startIndex = parseInt(fieldIndex, 10);
      const [movedField] = updatedFields.splice(startIndex, 1);
      updatedFields.splice(dropIndex, 0, movedField);
    }

    dispatch(setForm({ ...form, form_fields: updatedFields }));
    setTargetIndex(null);
  };

  // ============ HELPER FUNCTIONS ============

  /**
   * Creates a new field instance from a field template
   */
  const createNewFieldFromTemplate = (fieldTemplate) => {
    const { icon, ...cleanFieldData } = fieldTemplate;
    return {
      id: nanoid(),
      ...cleanFieldData,
      label: `New ${fieldTemplate.name} field`,
      type: fieldTemplate.type,
      required: false
    };
  };

  // ============ EVENT HANDLERS ============


   // Handles field selection for editing
   
  const handleFieldClick = (field) => {
    dispatch(setField(field));
  };


   // Handles field deletion
  
  const handleDeleteField = (fieldId) => {
    if (selectedField?.id === fieldId) {
      dispatch(setField(null));
    }
  };

  /**
   * Handles form name change
   */
  const handleFormNameChange = (e) => {
    dispatch(setForm({ ...form, name: e.target.value }));
  };

  /**
   * Handles form description change
   */
  const handleFormDescriptionChange = (e) => {
    dispatch(setForm({ ...form, description: e.target.value }));
  };

  /**
   * Saves the form (create new or update existing)
   */
  const handleSaveForm = async () => {
    const formToSave = { ...form };
    console.log('formToSave', formToSave)

    if (context === CONTEXT_TYPES.NEW_FORM) {
      dispatch(createNewForm(formToSave));
    } else if (context === CONTEXT_TYPES.EDITING) {
      console.log('updating', formToSave.form_fields)
      dispatch(updateForm(formToSave));
    }

    // Reset form name after save
    dispatch(setForm({ ...form, name: '' }));
    handleModalClose();
  };

  /**
   * Toggles between build and preview mode
   */
  const togglePreview = (isPreview) => {
    setPreview(isPreview);
  };

  // ============ RENDER ============

  return (
    <Box
      component="div"
      sx={{
        minWidth: '100%',
        minHeight: '100%',
        overflow: 'auto',
        backgroundColor: 'background.default',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Box component="main" sx={{ padding: '1.5rem', overflow: 'scroll', maxHeight: '100vh' }}>
        <Box
          component="div"
          sx={{
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
          }}
        >
          {/* Top Controls */}
          <Box
            component="div"
            sx={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '2rem',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            {/* Build/Preview Toggle */}
            <ButtonGroup sx={{ display: 'flex', alignItems: 'center' }}>
              <BasicButton
                text="build"
                size="large"
                onClick={() => togglePreview(false)}
                textColor="black"
                variant={preview ? '' : 'contained'}
              />
              <BasicButton
                text="preview"
                size="large"
                onClick={() => togglePreview(true)}
                variant={preview ? 'contained' : 'text'}
                textColor={preview ? 'black' : 'text.primary'}
              />
            </ButtonGroup>

            {/* Form Name Input */}
            <TextField
              type="text"
              placeholder="Insert Form Name"
              value={form?.name || ''}
              onChange={handleFormNameChange}
              sx={{
                flex: 1,
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                color: 'text.primary',
                '& .MuiInputBase-input::placeholder': {
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden'
                }
              }}
            />

            {/* Form Description Input */}
            <TextField
              type="text"
              placeholder="Insert Form description"
              value={form?.description || ''}
              onChange={handleFormDescriptionChange}
              sx={{
                flex: 1,
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                color: 'text.primary',
                '& .MuiInputBase-input::placeholder': {
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden'
                }
              }}
            />
          </Box>

          {/* Main Content Area */}
          {!preview ? (
            <Box
              component="div"
              sx={{
                display: 'grid',
                gridTemplateColumns: { md: '1fr 2fr 1fr' },
                gap: '1.5rem',
                overflow: 'auto'
              }}
            >
              {/* Left Column - Field Types */}
              <FieldTypesColumn handleDragStart={handleDragStart} />

              {/* Center Column - Drop Zone */}
              <DropZone
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                handleFieldClick={handleFieldClick}
                draggedField={draggedField}
                formFields={formFields}
                selectedField={selectedField}
                handleDraggedField={handleFieldDragStart}
                
              />

              {/* Right Column - Validations */}
              <ValidationsPanel />
            </Box>
          ) : (
            <FormView disabledFields={true} />
          )}

          {/* Bottom Controls */}
          <Box
            component="div"
            sx={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'end'
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
              />
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
