import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'messager',
  initialState: {
    message: '',
    type: '',
  },
  reducers: {
    // eslint-disable-next-line no-unused-vars
    resetMessage(state, action) {
      return ''
    },
    setMessage(state, action) {
      console.log(action.payload)
      return action.payload
    },
  },
})

export const { resetMessage, setMessage } = messageSlice.actions

export default messageSlice.reducer
