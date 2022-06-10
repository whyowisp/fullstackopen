import { createSlice } from '@reduxjs/toolkit'

//OBS! It´s always initialState, not initialMessage for example
const initialState = 'Just checking if you\'re awake'

const messageSlice = createSlice({
  name: 'message', 
  initialState
})

//export const {} = messageSlice.actions
export default messageSlice.reducer