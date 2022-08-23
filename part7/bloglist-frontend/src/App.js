import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'

import UsersView from './components/UsersView'
import UserBlogs from './components/UserBlogs'
import BlogView from './components/BlogView'
import Home from './components/Home'
import Navigation from './components/Navigation'

import { resetMessage } from './reducers/messageReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loggedInUserReducer'
import { initializeUsers } from './reducers/usersReducer'

import blogService from './services/blogs'

const App = () => {
  const user = useSelector((state) => state.user)
  const message = useSelector((state) => state.messager)
  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()

  //In case of page reload, this ensures that user stay logged in.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    console.log('App.js useEffect launched by [dispatch]')
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  //Clear notification box automatically. (This functionality has turned out to be unpredictable after redux refactor: ex 7.10)
  //Also this causes whole page re-render. Move in to component
  useEffect(() => {
    setTimeout(() => {
      dispatch(resetMessage())
    }, 5000)
  }, [message])

  return (
    <Container>
      <Router>
        <Navigation user={user} />
        <Routes>
          <Route path="/" element={<Home user={user} blogs={blogs} />} />
          <Route path="/users" element={<UsersView />} />
          <Route path="/users/:id" element={<UserBlogs />} />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>
      </Router>
    </Container>
  )
}

export default App
