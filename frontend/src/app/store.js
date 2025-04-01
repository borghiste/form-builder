import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/form/formSlice'

export default configureStore({
  reducer: {
    field: counterReducer,
  },
})