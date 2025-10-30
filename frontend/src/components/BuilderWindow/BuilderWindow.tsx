import React, { useState } from 'react';
import {nanoid} from 'nanoid';
import {useDispatch, useSelector} from  'react-redux';

// REDUX
import  { selectForm,  setFormName, setFormFields } from '../../features/formSlice';


// MUI
import { Box, ButtonGroup, TextField} from '@mui/material';


// COMPONENTS
import BasicButton from '../UI/BasicButton';
import FieldsList from './FieldsList';
import FieldTypesColumn from './FieldTypesColumn';
import ValidationsOptionsBox from './ValidationsOptionsBox';

 export default function BuilderWindow () {
  
   const form = useSelector(selectForm);
  //  const formFields = form?.form_fields ||  [];
   const [ formFields, setFormFields,] = useState([])

  const [selectedField, setSelectedField] = useState(null);
  const dispatch = useDispatch();
  const [draggedField, setDraggedField] = useState(null);
  const [preview, switchToPreview] = useState(false);
  const [draggedFieldIndex ,setDraggedFieldIndex] = useState(null)
  const[targetIndex, setTargetIndex] = useState()

  

  // Validation state
  const [validation, setValidation] = useState({
    fieldType: 'Text',
    required: true,
    customValidation: '',
  });



  // Drag and Drop Handlers
  
 // Drag and Drop Handlers for NEW fields
 // function used by field types column component o handle every single field button drag start behaviour
 const handleDragStart = (e, field) => {
  setDraggedField(field); 
  console.log('// Salva il tipo di campo')
  e.dataTransfer.effectAllowed = 'copy'; // Indica che è una copia
   const isNewField = e.dataTransfer.setData('newField', 'true'); // Marca come "nuovo campo"
  

};



// Allow drag over
const handleDragOver = (e) => {
  
  e.preventDefault();
  const isNewField = e.dataTransfer.getData('newField')
 
  e.dataTransfer.dropEffect = isNewField ? 'copy' : 'move';
};
  // handles field button drop by adding a new draggable field into the field list component
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
  
    // Leggi i dati dal drag
    const fieldIndex = e.dataTransfer.getData('fieldIndex'); // indice del campo trascinato
    const isReorder = e.dataTransfer.getData('reorder');    // flag per riordino
    const isNewField = e.dataTransfer.getData('newField');  // flag per nuovo campo
  
    // Copia dell'array dei campi
    const updatedFields = [...formFields];
  
    // Se è un nuovo campo (drag dalla colonna dei tipi)
    if (isNewField && draggedField) {
      const newField = {
        id: Date.now(),          // ID unico
        ...draggedField,
        label: `New ${draggedField.name}`,
        placeholder: `Enter ${draggedField.name.toLowerCase()}`,
        required: false,
      };
      // Inserisci nel punto giusto
      updatedFields.splice(dropIndex, 0, newField);
    }
    // Se è un riordino di un campo esistente
    else if (isReorder && fieldIndex !== '') {
      const startIndex = parseInt(fieldIndex, 10);
      // Rimuovi il campo dall'indice iniziale
      const [movedField] = updatedFields.splice(startIndex, 1);
      // Inserisci il campo nel nuovo indice
      updatedFields.splice(dropIndex, 0, movedField);
    }
  
    // Aggiorna lo stato dei campi
    setFormFields(updatedFields);
  
    // Reset highlight della drop zone
    setTargetIndex(null);
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

  const handleFieldDragStart = (e, index) => {
    setDraggedFieldIndex(index); // Salva l'indice (es: 2)
    e.dataTransfer.effectAllowed = 'move'; // Indica che è un movimento
    e.dataTransfer.setData('fieldIndex', index.toString()); // Marca con l'indice
  };

  return (
    <Box
    component={'div'}
      sx={{
        minHeight: '100%',
        overflow:'auto',
        backgroundColor: 'background.default',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
   

      {/* Main Content */}
      <Box component={'main'} style={{ padding: '1.5rem' }}>
        <Box
        component={'div'}
          sx={{
            backgroundColor: 'background.paper',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            overflow:'auto'
          }}
        >
          {/* Top Controls */}
          <Box component={'div'} sx={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center'}}>

          <ButtonGroup sx={{display:'flex', alignItems:'center'}}>
      <BasicButton
                text={"build"}
                size={'large'}
                onClick={() => {
                  switchToPreview(false);
                }}
                textColor={"black"}
                variant={preview ? "" : "contained"}
                borderradius={9}/>
       <BasicButton
                text={"preview"}
                size={'large'}
                onClick={() => {
                 switchToPreview(true);
                }}
                variant={!preview ? "text" : "contained"}
                textColor={!preview ? "text.primary" : "black"}
                borderradius={9}/>

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
            <FieldsList 
            onDragOver={handleDragOver} 
            onDrop={handleDrop} 
            handleFieldClick={handleFieldClick} 
            draggedField={draggedField} 
            formFields={formFields}
            selectedField={selectedField}
            handleDraggedField={handleFieldDragStart}
            
            
            
            />

            {/* Right Column - Validations */}
            <ValidationsOptionsBox
            selectedField={selectedField}/>

        
          </Box>
          ) : <p>preview</p>
        }
          {/* Bottom Controls */}
          <Box component={'div'} sx={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent:'end' }}>

          <ButtonGroup sx={{p:3}}>
      <BasicButton
                text={"save"}
                size={'large'}
                textColor={"black"}

                variant={ "outlined"}/>

       <BasicButton
                text={"cancel"}
                variant="outlined"
                textColor={!preview ? "text.primary" : "black"}
                size={"large"}/>

      </ButtonGroup>

            
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

