
// // BuilderWindow.test.tsx
// import React  from 'react';
// import * as ReactModule from 'react';
// import { render, screen } from '@testing-library/react';

// import { describe, it, expect, vi } from 'vitest';
// import { fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom'
// import { Provider } from 'react-redux'
// import { configureStore } from '@reduxjs/toolkit'
// import BuilderWindow from '../../components/BuilderWindow/BuilderWindow';

// /* ======================================================= */
// /* ===================== MOCKS ====================== */
// /* ======================================================= */

// // Mock reducer
// const mockFormReducer = (state = { name: '', form_fields: [] }, actions:any) =>{ 
//   switch(actions.type){
//     case 'form/addField':
//     return { ...state, form_fields: [...state.form_fields, action.payload] }
//     default: return state
//   }
// }
// const mockFormsListReducer = (state = { forms: [] }) => state
// const mockFieldReducer = (state = { label: '', type: '' }) => state

// // test store 
// const createTestStore = (preloadedState?: any) =>
//   configureStore({
//     reducer: {
//       form: mockFormReducer,
//       formsList: mockFormsListReducer,
//       field: mockFieldReducer,
//     },
//     preloadedState,
//   })

// // Helper per render con Redux
// const renderWithStore = (ui: React.ReactElement, state?: any) => {
//   const store = createTestStore(state)
//   render(<Provider store={store}>{ui}</Provider>)
//   return store
// }

// vi.mock('../../components/BuilderWindow/FieldsList', () => ({
//   default: ({ onDrop }: any) => (
//     <div
//       data-testid="fields-list"
//       onDrop={onDrop}
//       onDragOver={(e) => e.preventDefault()}
//       style={{ border: '1px solid gray', padding: 10 }}
//     >
//       Drop Zone
//     </div>
//   ),
// }));

// vi.mock('../../components/BuilderWindow/FieldTypesColumn', () => ({
//   default: ({ handleDragStart }: any) => (
//     <button
//       data-testid="field-type-text"
//       draggable
//       onDragStart={(e) => handleDragStart(e, { type: 'text', name: 'Text' })}
//     >
//       Text Field
//     </button>
//   ),
// }));


// /* ======================================================= */
// /* ===================== TEST SUITE ====================== */
// /* ======================================================= */

// describe('BuilderWindow', () => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//   it('renders the input and main buttons', () => {
//     renderWithStore(<BuilderWindow/>);

//     expect(screen.getByPlaceholderText('Insert Form Name')).toBeInTheDocument();
//     // main buttons
//     expect(screen.getByText(/Build/i)).toBeInTheDocument();
//     expect(screen.getByText(/Preview/i)).toBeInTheDocument();
//   }),

//   it('displays the form name from Redux state',  () => {
//     renderWithStore(<BuilderWindow />, {
//       form: { name: 'Test Form', form_fields: [] },
//       field: { label: '', type: '' },
//       formsList: { forms: [] }

//     })
//     const input = screen.getByPlaceholderText('Insert Form Name') as HTMLInputElement
//     fireEvent.change(input, { target: { value: 'Test Form' } })
//     expect(input.value).toBe('Test Form')


//   }),

//   it('switches between build and preview modes', () => {
//     renderWithStore(<BuilderWindow />)
  
//     // Entra in modalità preview
//     fireEvent.click(screen.getByText(/Preview/i))
//     expect(screen.getByText(/preview/i)).toBeInTheDocument()
  
//     // nack to build mode
//     fireEvent.click(screen.getByText(/Build/i))
//     expect(screen.getByText(/Build/i)).toBeInTheDocument()
//   })

  


//   it('adds a new field when dropped into the list', async () => {
//     const store = renderWithStore(<BuilderWindow/>, {
//       form: { name: 'Test form', form_fields: [] },
//       field: { label: 'Text Field', type: 'text' }, // ← Populate the field state
//       formsList: { forms: [] },
//     });
  
//     const list = screen.getByTestId('fields-list');
//     const draggable = screen.getByTestId('field-type-text');
    
//     // Simulate drag start
//     const dragStartEvent = {
//       dataTransfer: {
//         setData: vi.fn(),
//         effectAllowed: 'move',
//       },
//     } as any;
    
//     fireEvent.dragStart(draggable, dragStartEvent);
    
//     // Simulate drag over (required for drop to work)
//     const dragOverEvent = {
//       preventDefault: vi.fn(),
//       dataTransfer: {
//         dropEffect: 'move',
//       },
//     } as any;
    
//     fireEvent.dragOver(list, dragOverEvent);
    
//     // Simulate drop
//     const dropEvent = {
//       preventDefault: vi.fn(),
//       stopPropagation: vi.fn(),
//       dataTransfer: {
//         getData: vi.fn((key) => {
//           if (key === 'fieldType') return 'text';
//           if (key === 'newField') return 'true';
//           return '';
//         })
//       },
//     } as any;
    
//     fireEvent.drop(list, dropEvent);
    
//     await waitFor(() => {
//       const { form_fields } = store.getState().form;
//       expect(form_fields.length).toBeGreaterThan(0);
//     }, { timeout: 3000 });
//   });
  
// })
