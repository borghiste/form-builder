import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/themeSlice';
import UserReducer from '../features/UserSlice';

export default configureStore({
  reducer: {
    theme: themeReducer,
    User: UserReducer,
  },
})