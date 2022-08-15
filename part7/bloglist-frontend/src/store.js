import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import loggedInUserReducer from './reducers/loggedInUserReducer'

export const store = configureStore({
  reducer: {
    messager: messageReducer,
    blogs: blogReducer,
    user: loggedInUserReducer,
  },
})
