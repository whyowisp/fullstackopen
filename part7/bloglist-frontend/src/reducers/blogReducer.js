import { createSlice } from '@reduxjs/toolkit'

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

export default blogSlice.reducer
