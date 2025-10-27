import React, { useState } from 'react';
import {nanoid} from 'nanoid';
import {useDispatch, useSelector} from  'react-redux';

// REDUX
import  { selectForm,  setFormName } from '../../features/formSlice';


// MUI
import { Box, ButtonGroup, TextField} from '@mui/material';


// COMPONENTS
import BasicButton from '../UI/BasicButton';
import FieldsList from './FieldsList';
import FieldTypesColumn from './FieldTypesColumn';

 export default function BuilderWindow () {
  const [formFields, setFormFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const form = useSelector(selectForm);
  const dispatch = useDispatch();

  
  
  const [draggedField, setDraggedField] = useState(null);
  const [preview, switchToPreview] = useState(false);

  // Validation state
  const [validation, setValidation] = useState({
    fieldType: 'Text',
    required: true,
    customValidation: '',
  });



  // Drag and Drop Handlers
  const handleDragStart = (e, field) => {
    
    setDraggedField(field);
    e.dataTransfer.setData('application/json', JSON.stringify(field));
    e.dataTransfer.effectAllowed = 'copy';
  };

// handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };
  
  // Allow drop
  const handleDrop = (e,) => {
    e.preventDefault();
    
    
    if (draggedField) {
      const newField = {
        id: nanoid(),
        ...draggedField,
        label: `New ${draggedField.name}`,
        placeholder: `Enter ${draggedField.name.toLowerCase()}`,
        required: false,
      };
      setFormFields([...formFields, newField]);
      setSelectedField(newField);
      setDraggedField(null);
    }
   
  };

  const handleFieldClick = (field) => {
    setSelectedField(field);
    setValidation({
      fieldType: field.type,
      required: field.required,
      customValidation: field.customValidation || '',
    });
  };

  const handleDeleteField = (fieldId) => {
    setFormFields(formFields.filter((f) => f.id !== fieldId));
    if (selectedField?.id === fieldId) {
      setSelectedField(null);
    }
  };

  const handleApplyValidation = () => {
    if (selectedField) {
      setFormFields(
        formFields.map((f) =>
          f.id === selectedField.id
            ? {
                ...f,
                type: validation.fieldType,
                required: validation.required,
                customValidation: validation.customValidation,
              }
            : f
        )
      );
    }
  };



  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Header */}
     

      {/* Main Content */}
      <Box component={'main'} style={{ padding: '1.5rem' }}>
        <Box
        component={'div'}
          style={{
            backgroundColor: 'background.paper',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          }}
        >
          {/* Top Controls */}
          <Box component={'div'} sx={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>

          <ButtonGroup>
      <BasicButton
                text={"build"}
                onClick={() => {
                  switchToPreview(false);
                }}
                textColor={"black"}
                variant={preview ? "" : "contained"}/>
       <BasicButton
                text={"preview"}
                onClick={() => {
                 switchToPreview(true);
                }}
                variant={!preview ? "text" : "contained"}
                textColor={!preview ? "text.primary" : "black"}
                size={"small"}/>

      </ButtonGroup>

            <TextField
              type="text"
              placeholder="Insert Form Name"
              value={form.name}
              onChange={(e) => {dispatch(setFormName(e.target.value))}}
              sx={{
                flex: 1,
                padding: '0.5rem 1rem',
                backgroundColor: 'Background.default',

                borderRadius: '0.375rem',
                
                fontSize: '0.875rem',
              }}
            />
          </Box>

          {/* Three Column Layout */}
          {!preview ?
          (
          <Box component={'div'} sx={{ display: 'grid', gridTemplateColumns:{ md:'1fr 2fr 1fr'}, gap: '1.5rem', overflow:'auto' }}>
            {/* Left Column - Form Fields types buttons */}
            <FieldTypesColumn handleDragStart={handleDragStart}/>
            


            {/* Center Column - Drop Zone */}
            <FieldsList onDragOver={handleDragOver} 
            onDrop={handleDrop} 
            handleFieldClick={handleFieldClick} 
            draggedField={draggedField} 
            formFields={formFields}
            selectedField={selectedField}
            />
          

            {/* Right Column - Validations */}
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>
                Set Validations
              </h2>
              {selectedField ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                
                        marginBottom: '0.5rem',
                      }}
                    >
                      Field Type
                    </label>
                    <select
                      value={validation.fieldType}
                      onChange={(e) => setValidation({ ...validation, fieldType: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                      
                        borderRadius: '0.375rem',
                       
                      }}
                    >
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="number">Number</option>
                      <option value="telephone">Telephone</option>
                      <option value="date">Date</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                      Required field
                    </span>
                    <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                      <input
                        type="checkbox"
                        checked={validation.required}
                        onChange={(e) => setValidation({ ...validation, required: e.target.checked })}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: validation.required ? '#3B82F6' : '#ccc',
                          transition: '0.4s',
                          borderRadius: '24px',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            content: '',
                            height: '18px',
                            width: '18px',
                            left: validation.required ? '23px' : '3px',
                            bottom: '3px',
                            backgroundColor: 'white',
                            transition: '0.4s',
                            borderRadius: '50%',
                          }}
                        />
                      </span>
                    </label>
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        
                        marginBottom: '0.5rem',
                      }}
                    >
                      Custom Validations
                    </label>
                    <textarea
                      rows={3}
                      value={validation.customValidation}
                      onChange={(e) => setValidation({ ...validation, customValidation: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                      
                       
                        borderRadius: '0.375rem',
                       
                        fontFamily: 'inherit',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  <button
                    onClick={handleApplyValidation}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: '#3B82F6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                  >
                    APPLY
                  </button>
                </div>
              ) : (
                <p style={{ textAlign: 'center', marginTop: '2rem' }}>
                  Select a field to edit validations
                </p>
              )}
            </div>
          </Box>
          ) : <p>preview</p>
        }
        </Box>
      </Box>
    </div>
  );
};

