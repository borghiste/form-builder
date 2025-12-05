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
      dispatch(setField(newField));
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

  /**
   * Handles field selection for editing
   */
  const handleFieldClick = (field) => {
    dispatch(setField(field));
  };

  /**
   * Handles field deletion
   */
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

    if (context === CONTEXT_TYPES.NEW_FORM) {
      dispatch(createNewForm(formToSave));
    } else if (context === CONTEXT_TYPES.EDITING) {
      dispatch(updateForm(formToSave));
    }

    // Reset form name after save
    dispatch(setForm({ ...form, name: '' }));
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
// import React, { useState } from 'react';
// import {nanoid} from 'nanoid';
// import {useDispatch, useSelector} from  'react-redux';
// import { useContext } from 'react';
// import {modalContext} from '../../App';

// // REDUX
// import  { selectForm, setFormFields, setForm, addField } from '../../features/formSlice';
// import { createNewForm, updateForm } from '../../features/formsListSlice';
// // import { selectFields, setFields} from '../../features/fieldSlice';
// import {  setField, selectField } from '../../features/fieldSlice';


// // MUI
// import { Box, ButtonGroup, TextField} from '@mui/material';


// // COMPONENTS
// import BasicButton from '../UI/BasicButton';
// import DropZone from './DropZone';
// import FieldTypesColumn from './FieldTypesColumn';
// import ValidationsPanel from './ValidationsPanel';

// import FormView from '../FormView';


//  export default function BuilderWindow ({handleModalClose}) {
  
//    const form = useSelector(selectForm);
//     const formFields = form?.form_fields || [];
    
 

  
//   const dispatch = useDispatch();
//   const [draggedField, setDraggedField] = useState(null);
//   const [preview, switchToPreview] = useState(false);
//   const [draggedFieldIndex ,setDraggedFieldIndex] = useState(null)
//   const[targetIndex, setTargetIndex] = useState()
  
//   const  modalTypeContext = useContext(modalContext);
//   const {context, setContext} = modalTypeContext;
//   const selectedField = useSelector(selectField)


//   // Validation state



//   // Drag and Drop Handlers
  
//  // Drag and Drop Handlers for NEW fields

//  // function used by field types column component to handle every single field button drag start behavior
//  const handleDragStart = (e, field) => {

//   setDraggedField(field); 
 
//   e.dataTransfer.effectAllowed = 'copy'; // It'sa copy
//    const isNewField = e.dataTransfer.setData('newField', 'true'); // Mark as "new field"
  

// };


// // Allow drag over
// const handleDragOver = (e) => {
  
//   e.preventDefault();
//   const isNewField = e.dataTransfer.getData('newField')
 
//   e.dataTransfer.dropEffect = isNewField ? 'copy' : 'move';
// };
//   // handles field button drop by adding a new draggable field into the field list component
//   const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    
//     e.preventDefault();
//     e.stopPropagation();
  
//     // read data from drag start
//     const fieldIndex = e.dataTransfer.getData('fieldIndex'); // drg field index
//     const isReorder = e.dataTransfer.getData('reorder');    // reorder flag
//     const isNewField = e.dataTransfer.getData('newField');  // new field flag
  
//     // Copies fields fields state into new array
//     const updatedFields = [...formFields, ...selectedField];
  
//     // Se è un nuovo campo (drag dalla colonna dei tipi)
//     if (isNewField && draggedField) {
//       const {icon, ...cleanDraggedField} = draggedField
//       const newField = {
//         id: nanoid(),
//         ...cleanDraggedField,
//          label: `New ${draggedField.name} field`,
//         type: draggedField.type,
//         required: false,
//         // placeholder: `Enter ${draggedField.name}`,
//       }
//       dispatch(setField(newField))
       
     
//        dispatch(addField({form_fields:newField}));
      
//       // updatedFields.splice(dropIndex, 0, newField);
//       updatedFields.push(newField);
      
//     }
//     // Se è un riordino di un campo esistente
//     else if (isReorder && fieldIndex !== '') {
//       const startIndex = parseInt(fieldIndex, 10);
//       // Rimuovi il campo dall'indice iniziale
//       const [movedField] = updatedFields.splice(startIndex, 1);
//       // Inserisci il campo nel nuovo indice
//       updatedFields.splice(dropIndex, 0, movedField);
//     }
  
//     // updated form fields state
//     dispatch(setForm({...form, form_fields: updatedFields}))
    
    
  
//     // Reset highlight della drop zone
//     setTargetIndex(null);
    
//   }
  
  

//   const handleFieldClick = (field) => {
    
//    dispatch(setField(field))
//   };

//   const handleDeleteField = (fieldId) => {

//     // setFormFields(formFields.filter((f) => f.id !== fieldId));
//     if (selectedField?.id === fieldId) {
      
//       dispatch(setField(null));
//     }
//   };

//   const handleFieldDragStart = (e, index) => {
//     setDraggedFieldIndex(index); // Salva l'indice (es: 2)
//     e.dataTransfer.effectAllowed = 'move'; // Indica che è un movimento
//     e.dataTransfer.setData('fieldIndex', index.toString()); 
//   };

//   const handleSaveForm = async () => {
    
    
//     const newForm = {...form}
//     if(context === 'newForm'){

     
//       dispatch(createNewForm(newForm))
//     }
//     else if(context === 'editing')
//       { dispatch(updateForm(newForm));
//   }
    
    
     
     
   
//     dispatch(setForm({...form, name: ''}));
    
//   }

//   return (
//     <Box
//     component={'div'}
//       sx={{
//         minWidth:'100%',
//         minHeight: '100%',
//         overflow:'auto',
//         backgroundColor: 'background.default',
//         fontFamily: 'Inter, system-ui, sans-serif',
//       }}
//     >
   

//       {/* Main Content */}
//       <Box component={'main'} style={{ padding: '1.5rem', overflow:'scroll',maxHeight:'100vh' }}>
//         <Box
//         component={'div'}
//           sx={{
//             padding: '1.5rem',
//             borderRadius: '0.5rem',
//             boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            
//           }}
//         >
//           {/* Top Controls */}
//           <Box component={'div'} sx={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center', flexDirection:'column'}}>

//           <ButtonGroup sx={{display:'flex', alignItems:'center'}}>
//       <BasicButton
//                 text={"build"}
//                 size={'large'}
//                 onClick={() => {
//                   switchToPreview(false);
//                 }}
//                 textColor={"black"}
//                 variant={preview ? "" : "contained"}/>
//        <BasicButton
//                 text={"preview"}
//                 size={'large'}
//                 onClick={() => {
//                  switchToPreview(true);
//                 }}
//                 variant={!preview ? "text" : "contained"}
//                 textColor={!preview ? "text.primary" : "black"}
//                 />

//       </ButtonGroup>
              
//             <TextField
//               type="text"
//               placeholder="Insert Form Name"
//               value={form?.name}
//               onChange={(e) => {dispatch(setForm({name: e.target.value}))}}
//               sx={{
//                 flex: 1,
//                 borderRadius: '0.375rem',
//                 fontSize: '0.875rem',
//                 color:'text.primary',
//                 '& .MuiInputBase-input::placeholder': {
//       textOverflow: 'ellipsis',
//       whiteSpace: 'nowrap',
//       overflow: 'hidden',
//     },
//               }}
//             />
//              <TextField
//               type="text"
//               placeholder="Insert Form description"
//               value={form?.description}
//               onChange={(e) => {dispatch(setForm({...form, description: e.target.value}))}}
//               sx={{
//                 flex: 1,
//                 borderRadius: '0.375rem',
//                 fontSize: '0.875rem',
//                 color:'text.primary',
//                 '& .MuiInputBase-input::placeholder': {
//       textOverflow: 'ellipsis',
//       whiteSpace: 'nowrap',
//       overflow: 'hidden',
//     },
//               }}
//             />
            
//           </Box>

//           {/* Three Column Layout */}
//           {!preview ?
//           (
//           <Box component={'div'} sx={{ display: 'grid', gridTemplateColumns:{ md:'1fr 2fr 1fr'}, gap: '1.5rem', overflow:'auto' }}>
//             {/* Left Column - Form Fields types buttons */}
//             <FieldTypesColumn handleDragStart={handleDragStart}/>
            

//             {/* Center Column - Drop Zone */}
//             <DropZone 
//             onDragOver={handleDragOver} 
//             onDrop={handleDrop} 
//             handleFieldClick={handleFieldClick} 
//             draggedField={draggedField} 
//             formFields={formFields}
//             selectedField={selectedField}
//             handleDraggedField={handleFieldDragStart}
//             setFormFields={setFormFields}/>

//             {/* Right Column - Validations */}
//             <ValidationsPanel/>

        
//           </Box>
//           ) : <FormView disabledFields={preview ? true : false}/>
//         }
//           {/* Bottom Controls */}
//           <Box component={'div'} sx={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent:'end' }}>

//           <ButtonGroup sx={{p:3}}>
//       <BasicButton
//                 text={"save"}
//                 size={'large'}
//               onClick={() => {handleSaveForm()}}
//                 variant={ "outlined"}
//                 textColor={!preview ? "text.primary" : "black"}
//                 />

//       <BasicButton
//                 text={"cancel"}
//                 variant={"outlined"}
//                 textColor={!preview ? "text.primary" : "black"}
//                 size={"large"}/>
                

//       </ButtonGroup>

            
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

