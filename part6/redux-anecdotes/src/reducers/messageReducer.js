import { createSlice } from "@reduxjs/toolkit"

//OBS! It´s always initialState, not initialMessage for example
const initialState = "Just checking if you're awake"

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(state, action) {
      //Obs, apparently this returns new state (updates store), so no need to assign it like this: state = action.payload
      //I think this return is for createSlice() which does the actual state updating.
      //Confusing though because this function is inside an object
      return action.payload
    },
    resetMessage(state, action) {
      return ""
    },
  },
})

export const { setMessage, resetMessage } = messageSlice.actions
export default messageSlice.reducer
