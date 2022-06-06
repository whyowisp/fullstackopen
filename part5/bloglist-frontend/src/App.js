import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = (() => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null) // set to "error" or "ok" (atoms?)

  //Clear notification box automatically
  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 5000)
  }, [message])

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

  const loadBlogs = () => {
    blogService.getAll()
      .then((blogs) => {
      //ex5.9 solution
        setBlogs(blogs.sort((a, b) => a.likes - b.likes))
        console.log('Blogs loaded and sorted')
      })
  }

  const createNewBlog = async (newBlog) => {
    await blogService
      .createNew(newBlog)
      .then((response) => {
        console.log(JSON.stringify(response))
        setMessageType('ok')
        setMessage(`${newBlog.title} from author ${newBlog.author} created successfully`)
      })
      .catch((error) => {
        console.log('creating new object failed: ' + error.response.data)
        setMessageType('error')
        setMessage('Creating new blog failed')
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

      setMessageType('ok')
      setMessage('Login successful')

      loadBlogs()
    } catch (exception) {
      setMessageType('error')
      setMessage('Login failed')
    }
  }

  const handleLogoutClick = (event) => {
    event.preventDefault()
    console.log(user.name + ' logged out')
    window.localStorage.removeItem('loggedBlogappUser')

    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} messageType={messageType} />
        <form onSubmit={handleLogin}>
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
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} messageType={messageType} />
      <div>
        Logged in as <b>{user.name} </b>
        <button onClick={(event) => handleLogoutClick(event)}>Logout</button>
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
          setMessage={setMessage}
          setMessageType={setMessageType}
          username={user.name}
        />
      ))}
    </div>
  )
})

export default App
