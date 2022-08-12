import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = {
  blogs: [],
}

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setBlogs } = blogSlice.actions

//thunk functions
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogsFromDb = await blogService.getAll()
    blogsFromDb.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogsFromDb))
  }
}

export default blogSlice.reducer
