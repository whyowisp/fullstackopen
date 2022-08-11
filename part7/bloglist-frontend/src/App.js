import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useSelector, useDispatch } from 'react-redux'
import { resetMessage, setMessage } from './reducers/messageReducer'
import { setBlogs } from './reducers/blogReducer'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const message = useSelector((state) => state.messager)
  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()

  //In case of page reload, this ensures that user stay logged in.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      loadBlogs()
    }
  }, []) //Runs only once per reload

  //Clear notification box automatically. (This functionality has turned out to be unpredictable after redux refactor: ex 7.10)
  useEffect(() => {
    setTimeout(() => {
      dispatch(resetMessage())
    }, 5000)
  }, [message])

  const loadBlogs = () => {
    blogService.getAll().then((blogs) => {
      //blogs.sort((a, b) => b.likes - a.likes)
      dispatch(setBlogs(blogs))
      console.log('Blogs loaded and sorted')
    })
  }

  const createNewBlog = async (newBlog) => {
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

    loadBlogs()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

      dispatch(setMessage({ message: 'Login successful', type: 'ok' }))

      loadBlogs()
    } catch (exception) {
      dispatch(setMessage({ message: 'Login failed', type: 'error' }))
    }
  }

  const handleLogoutClick = (event) => {
    event.preventDefault()
    console.log(user.name + ' logged out')
    window.localStorage.removeItem('loggedBlogappUser')

    setUser(null)
  }

  //render
  if (user === null) {
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

  //else
  if (blogs.length > 0) {
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
          <BlogForm createNewBlog={createNewBlog} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            loadBlogs={loadBlogs}
            username={user.name}
          />
        ))}
      </div>
    )
  }
}

export default App
