import { configureStore } from '@reduxjs/toolkit'
import  fileSlice  from './slices/slices.js'
import  editSlice  from './slices/editData.js'

export const store = configureStore({
  reducer: {
    file:fileSlice,
    edit:editSlice
  },
})