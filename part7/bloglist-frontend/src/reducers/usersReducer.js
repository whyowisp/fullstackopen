import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers() {},
    getUsers() {},
  },
})

export const { setUsers, getUsers } = usersSlice.actions

export default usersSlice.reducer
