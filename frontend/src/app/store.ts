import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/themeSlice';
import UserReducer from '../features/UserSlice';
import formsReducer from '../features/formsListSlice';
import formReducer from '../features/formSlice';
import fieldReducer from '../features/fieldSlice';

export default configureStore({
  reducer: {
    theme: themeReducer,
    User: UserReducer,
    forms: formsReducer,
    form: formReducer,
    field: fieldReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
