import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useSelector, useDispatch } from 'react-redux'
import { resetMessage, setMessage } from './reducers/messageReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/loggedInUserReducer'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  //Login form data is stored in App. Data is cleared after login.
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //Redux store states
  const user = useSelector((state) => state.user)
  console.log(user)
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
      reloadBlogs('App.js useEffect')
    }
  }, [])

  //Clear notification box automatically. (This functionality has turned out to be unpredictable after redux refactor: ex 7.10)
  useEffect(() => {
    setTimeout(() => {
      dispatch(resetMessage())
    }, 5000)
  }, [message])

  //Important! Always use this method to reload blogs from db; send over to child components etc.
  const reloadBlogs = () => {
    //SetTimeout() to let changes in db happen before reloading from there. Should try and find better solution.
    setTimeout(() => {
      dispatch(initializeBlogs())
    }, 500)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      //user login related stuff
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setMessage({ message: 'Login successful', type: 'ok' }))

      reloadBlogs()
    } catch (exception) {
      dispatch(setMessage({ message: 'Login failed', type: 'error' }))
    }
    setUsername('')
    setPassword('')
  }

  const handleLogoutClick = (event) => {
    event.preventDefault()
    console.log(user.name + ' logged out')
    window.localStorage.removeItem('loggedBlogappUser')

    dispatch(clearUser())
  }

  //render
  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form className="loginform" onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  //blogs existence must be checked, otherwise rendering (unexistent) variables causes errors
  else if (blogs) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <div>
          Logged in as <b>{user.name} </b>
          <button
            id="logoutButton"
            onClick={(event) => handleLogoutClick(event)}
          >
            Logout
          </button>
        </div>
        <br></br>
        <Togglable buttonLabel="New blog">
          <BlogForm reloadBlogs={reloadBlogs} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            reloadBlogs={reloadBlogs}
            username={user.name}
          />
        ))}
      </div>
    )
  }
}

export default App
