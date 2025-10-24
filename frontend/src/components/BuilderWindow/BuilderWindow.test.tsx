import React, { useState } from 'react';

// COMPONENTS
import DeleteButton from '../UI/DeleteButton';
import DraggableField from '../UI/DraggableField';

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [formName, setFormName] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [buildMode, setBuildMode] = useState('build');
  const [draggedField, setDraggedField] = useState(null);

  // Validation state
  const [validation, setValidation] = useState({
    fieldType: 'Text',
    required: true,
    customValidation: '',
  });

  const fieldTypes = [
    { type: 'text', label: 'Text', icon: '📝' },
    { type: 'textarea', label: 'Text Area', icon: '📄' },
    { type: 'email', label: 'Email', icon: '✉️' },
    { type: 'number', label: 'Number', icon: '🔢' },
    { type: 'telephone', label: 'Telephone', icon: '📞' },
    { type: 'date', label: 'Date', icon: '📅' },
    { type: 'time', label: 'Time', icon: '⏰' },
    { type: 'select', label: 'Select List', icon: '📋' },
    { type: 'checkbox', label: 'Checkbox', icon: '☑️' },
  ];

  // Drag and Drop Handlers
  const handleDragStart = (e, field) => {
    
    setDraggedField(field);
    e.dataTransfer.effectAllowed = 'copy';
  };

// Allow drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };
  
  // Allow drop
  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedField) {
      const newField = {
        id: Date.now(),
        ...draggedField,
        label: `New ${draggedField.label}`,
        placeholder: `Enter ${draggedField.label.toLowerCase()}`,
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

  const theme = {
    bg: darkMode ? '#111827' : '#F9FAFB',
    surface: darkMode ? '#1F2937' : '#FFFFFF',
    text: darkMode ? '#F9FAFB' : '#111827',
    textSecondary: darkMode ? '#9CA3AF' : '#6B7280',
    border: darkMode ? '#374151' : '#E5E7EB',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.bg,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Header */}
     

      {/* Main Content */}
      <main style={{ padding: '1.5rem' }}>
        <div
          style={{
            backgroundColor: theme.surface,
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          }}
        >
          {/* Top Controls */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setBuildMode('build')}
                style={{
                  padding: '0.5rem 1.5rem',
                  backgroundColor: buildMode === 'build' ? '#3B82F6' : darkMode ? '#374151' : '#E5E7EB',
                  color: buildMode === 'build' ? '#fff' : theme.textSecondary,
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                BUILD
              </button>
              <button
                onClick={() => setBuildMode('preview')}
                style={{
                  padding: '0.5rem 1.5rem',
                  backgroundColor: buildMode === 'preview' ? '#3B82F6' : darkMode ? '#374151' : '#E5E7EB',
                  color: buildMode === 'preview' ? '#fff' : theme.textSecondary,
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                PREVIEW
              </button>
            </div>

            <input
              type="text"
              placeholder="Insert Form Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                backgroundColor: theme.bg,
                border: `1px solid ${theme.border}`,
                borderRadius: '0.375rem',
                color: theme.text,
                fontSize: '0.875rem',
              }}
            />
          </div>

          {/* Three Column Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1.5rem' }}>
            {/* Left Column - Form Fields */}
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: theme.text, marginBottom: '1rem' }}>
                Form Fields
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {fieldTypes.map((field) => (
                  <>
                  <DraggableField icon={field.icon} field={field}/>
                  <div
                    key={field.type}
                    draggable
                    onDragStart={(e) => handleDragStart(e, field)}
                    style={{
                      padding: '0.75rem 1rem',
                      backgroundColor: darkMode ? '#374151' : '#F9FAFB',
                      border: `1px solid ${theme.border}`,
                      borderRadius: '0.375rem',
                      cursor: 'grab',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      color: theme.text,
                    }}
                    onMouseDown={(e) => (e.currentTarget.style.cursor = 'grabbing')}
                    onMouseUp={(e) => (e.currentTarget.style.cursor = 'grab')}
                    >
                    <span style={{ fontSize: '1.25rem' }}>{field.icon}</span>
                    <span>{field.label}</span>
                  </div>
                    </>
                ))}
              </div>
            </div>

            {/* Center Column - Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              style={{
                minHeight: '500px',
                border: `2px dashed ${theme.border}`,
                borderRadius: '0.5rem',
                padding: '1.5rem',
                backgroundColor: draggedField ? (darkMode ? '#1F2937' : '#F3F4F6') : 'transparent',
                transition: 'background-color 0.2s',
              }}
            >
              {formFields.length === 0 ? (
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.textSecondary,
                  }}
                >
                  
                  <p>Drag and drop field here</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {formFields.map((field) => (
                    <div
                      key={field.id}
                      onClick={() => handleFieldClick(field)}
                      style={{
                        padding: '1rem',
                        backgroundColor: selectedField?.id === field.id ? '#DBEAFE' : theme.bg,
                        border: `2px solid ${selectedField?.id === field.id ? '#3B82F6' : theme.border}`,
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        position: 'relative',
                      }}
                    >
                      {
                        <DeleteButton onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteField(field.id)}}/>
                      /* <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteField(field.id);
                        }}
                        style={{
                          position: 'absolute',
                          top: '0.5rem',
                          right: '0.5rem',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1.25rem',
                          opacity: 0.5,
                        }}
                      >
                        ❌
                      </button> */}
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: theme.text,
                          marginBottom: '0.5rem',
                        }}
                      >
                        {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: `1px solid ${theme.border}`,
                          borderRadius: '0.375rem',
                          backgroundColor: theme.surface,
                          color: theme.text,
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Validations */}
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: theme.text, marginBottom: '1rem' }}>
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
                        color: theme.textSecondary,
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
                        backgroundColor: theme.bg,
                        border: `1px solid ${theme.border}`,
                        borderRadius: '0.375rem',
                        color: theme.text,
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
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: theme.textSecondary }}>
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
                        color: theme.textSecondary,
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
                        backgroundColor: theme.bg,
                        border: `1px solid ${theme.border}`,
                        borderRadius: '0.375rem',
                        color: theme.text,
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
                <p style={{ color: theme.textSecondary, textAlign: 'center', marginTop: '2rem' }}>
                  Select a field to edit validations
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormBuilder;

// import React, { useState } from "react";

// // MUI
// import { Box, ButtonGroup, Divider, Typography } from "@mui/material";

// // COMPONENTS
// import BasicButton from "../UI/BasicButton";

// import FormPreview from "../BuilderWindow/FormPreview";
// import BuilderSection from "./BuilderSection";



// export default function BuilderWindow({handleModalClose}: {handleModalClose: () => void}) {
//   // state to switch from builder to preview
//   const [preview, switchToPreview] = useState(false);

//   return(
//   <Box sx={{display:'flex', flexDirection:'column'}}>

//       {/* window header */}
//      <Box component={'header'} sx={{display:'flex', justifyContent:'space-between'}}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//                   Form Builder
//                 </Typography>
      
//       <BasicButton text={'X'} onClick={() => {handleModalClose()}}
//       textColor="magenta.dark"/>
     


//      </Box>
//      <ButtonGroup>
//      <BasicButton
//                text={"build"}
//                onClick={() => {
//                  switchToPreview(false);
//                }}
//                textColor={"black"}
//                variant={preview ? "" : "contained"}
//                onclick={() => {
//                  handleModalClose();
//                }}/>
//       <BasicButton
//                text={"preview"}
//                onClick={() => {
//                  switchToPreview(true);
//                }}
//                variant={!preview ? "text" : "contained"}
//                textColor={!preview ? "text.primary" : "black"}
//                size={"small"}/>

//      </ButtonGroup>

//      <Divider/>

//      <Box>

//                {/* switch from builder to preview */}
//            {preview ? <FormPreview /> : <BuilderSection />} 
          
//      </Box>


//   </Box>
//   )

// }