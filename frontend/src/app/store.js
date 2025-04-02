import { configureStore } from '@reduxjs/toolkit';
import TextInputReducer from '../features/form/formTextInputSlice';
import DateinputReducer from '../features/form/formDateInputSlice';

export default configureStore({
  reducer: {
    TextInputFields: TextInputReducer,
    DateinputFields: DateinputReducer,
  },
})