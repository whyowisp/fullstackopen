import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setMessage } from './messageReducer'

const sortByLikesDesc = (blogs) => {
  blogs.sort((a, b) => b.likes - a.likes)
}

export const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
  },
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setBlogs } = blogSlice.actions

//thunk functions (via redux-thunk)
export const initializeBlogs = () => {
  //Note to self: Function returns async function which takes dispatch as an argument,
  //then it uses it to dispatch data to reducer in this same file
  return async (dispatch) => {
    const blogsFromDb = await blogService.getAll()
    sortByLikesDesc(blogsFromDb)
    dispatch(setBlogs(blogsFromDb))
  }
}

export const createNewBlog = (newBlog) => {
  return async (dispatch) => {
    await blogService
      .createNew(newBlog)
      .then(() => {
        dispatch(
          setMessage({
            message: `${newBlog.title} from author ${newBlog.author} created successfully`,
            type: 'ok',
          })
        )
      })
      .catch((error) => {
        console.log('creating new object failed: ' + error)
        dispatch(
          setMessage({
            message: 'Creating a new blog failed',
            type: 'error',
          })
        )
      })
  }
}

export const updateLikesOfBlog = (updatedBlog, id) => {
  return async (dispatch) => {
    await blogService
      .updateBlog(updatedBlog, id)
      .then((response) => {
        console.log('Updated blog: ' + JSON.stringify(response))
        dispatch(
          setMessage({
            message: `You liked blog ${updatedBlog.title}`,
            type: 'ok',
          })
        )
      })
      .catch((exception) => console.log('Blog update failed: ' + exception))
  }
}

export const deleteBlog = (id, title) => {
  return async (dispatch) => {
    await blogService
      .deleteBlog(id)
      .then((response) => {
        console.log(response)
        dispatch(
          setMessage({
            message: `Blog ${title} deleted`,
            type: 'ok',
          })
        )
      })
      .catch((error) => console.log('Poop hit the fan: ' + error))
  }
}

export default blogSlice.reducer
