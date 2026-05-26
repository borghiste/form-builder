import { configureStore } from '@reduxjs/toolkit';


import formsReducer from '../features/formsListSlice';
import formReducer from '../features/formSlice';
import fieldReducer from '../features/fieldSlice';
import formsEntriesReducer from '../features/FormEntriesSlice';


export default configureStore({
  reducer: {
    
    
    forms: formsReducer,
    form: formReducer,
    field: fieldReducer,
    entries: formsEntriesReducer,

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
