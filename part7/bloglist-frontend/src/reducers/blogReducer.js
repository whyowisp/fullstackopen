import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setMessage } from './messageReducer'

const sortByLikesDesc = (blogs) => {
  blogs.sort((a, b) => b.likes - a.likes)
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const initialState = null

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      console.log(action.payload)
      return action.payload
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    updateLikes(state, action) {
      const id = action.payload
      const blog = state.find((blog) => blog.id === id)
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
    },
  },
})

// Action creators are generated for each case reducer function
export const { setBlogs, removeBlog, addBlog, updateLikes } = blogSlice.actions

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

export const createNewBlog = (title, author, url, user) => {
  const newBlog = {
    title,
    author,
    url,
    id: generateId(),
    user,
  }

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
        dispatch(initializeBlogs())
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

export const updateLikesOfBlog = (blogToUpdate, id) => {
  const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
  return async (dispatch) => {
    dispatch(updateLikes(id))
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
    console.log('blogReducer delete: what id?: ', id)
    dispatch(removeBlog(id))
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
