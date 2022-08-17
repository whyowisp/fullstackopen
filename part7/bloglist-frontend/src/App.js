import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import UsersView from './components/UsersView'
import UserBlogs from './components/UserBlogs'
import Home from './components/Home'

import { resetMessage } from './reducers/messageReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loggedInUserReducer'

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
      reloadBlogs()
    }
  }, [])

  //Clear notification box automatically. (This functionality has turned out to be unpredictable after redux refactor: ex 7.10)
  //Also this causes whole page re-render. Move in to component
  useEffect(() => {
    setTimeout(() => {
      dispatch(resetMessage())
    }, 5000)
  }, [message])

  //Important! Always use this method to reload blogs from db; send over to child components etc.
  const reloadBlogs = () => {
    //SetTimeout() to let changes in db happen before reloading from there. There must be better solution
    setTimeout(() => {
      dispatch(initializeBlogs())
    }, 500)
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home user={user} blogs={blogs} reloadBlogs={reloadBlogs} />
            }
          />
          <Route path="/users" element={<UsersView />} />
          <Route path="/users/:id" element={<UserBlogs />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
