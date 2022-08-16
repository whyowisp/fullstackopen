import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = null

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

//'Thunk reducers'
export const initializeUsers = () => {
  return async (dispatch) => {
    const allUsersFromDb = await userService.getAll()
    dispatch(setUsers(allUsersFromDb))
  }
}

export default usersSlice.reducer
