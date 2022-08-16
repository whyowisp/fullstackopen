import { useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserInfo from './components/UserInfo'
import LoginForm from './components/LoginForm'
import UsersView from './components/UsersView'

import { useSelector, useDispatch } from 'react-redux'
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

  //render
  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm reloadBlogs={reloadBlogs} />
      </div>
    )
  }
  //blogs existence must be checked, otherwise rendering (inexistent) variables causes errors
  else if (blogs) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <UserInfo />
        <br></br>
        <Togglable buttonLabel="New blog">
          <BlogForm reloadBlogs={reloadBlogs} />
        </Togglable>
        <BlogList />
        <UsersView />
      </div>
    )
  }
}

export default App
