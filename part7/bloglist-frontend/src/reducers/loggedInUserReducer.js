import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const loggedInUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return initialState
    },
  },
})

export const { setUser, clearUser } = loggedInUserSlice.actions

export default loggedInUserSlice.reducer
