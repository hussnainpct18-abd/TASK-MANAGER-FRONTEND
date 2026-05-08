import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    uploadFile:(state,action)=>{
        state.value=action.payload;
    },
  },
})

export const { uploadFile } = fileSlice.actions

export default fileSlice.reducer