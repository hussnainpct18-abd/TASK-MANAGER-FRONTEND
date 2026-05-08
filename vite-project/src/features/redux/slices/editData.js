import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    uploadData:(state,action)=>{
        state.value=action.payload;
    },
  },
})

export const { uploadData } = editSlice.actions

export default editSlice.reducer