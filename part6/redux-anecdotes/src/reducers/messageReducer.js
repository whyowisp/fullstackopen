import { createSlice } from "@reduxjs/toolkit"

//OBS! It´s always initialState, not initialMessage for example
const initialState = null

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(state, action) {
      //Obs, apparently this returns new state (updates store), so no need to assign it like this: state = action.payload
      return action.payload
    },
    resetMessage(state, action) {
      return ""
    },
  },
})

export const { setMessage, resetMessage } = messageSlice.actions

export const setNotification = (message, interval) => {
  return dispatch => { 
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(resetMessage())
    }, interval * 1000)
  }
}

export default messageSlice.reducer
