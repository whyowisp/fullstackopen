import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

const CreateBlogForm = ({ loadBlogs }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    await blogService
      .createNew(newBlog)
      .then((response) => console.log(response))
      .catch((error) => {
        console.log("creating new object failed: " + error.response.data)
      })

    setTitle("")
    setAuthor("")
    setUrl("")
    loadBlogs()
  }

  return (
    <form onSubmit={handleNewBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  //In case of page reload, this ensures that user stay logged in.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      loadBlogs()
    }
  }, []) //Runs only once per reload

  /* This wont work with my backend
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
*/

  const loadBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))

      blogService.setToken(user.token)

      setUser(user)
      setUsername("")
      setPassword("")

      loadBlogs()
    } catch (exception) {
      console.log("Logging in failed: " + exception)
    }
  }

  const handleLogoutClick = (event) => {
    event.preventDefault()
    console.log(user.name + " logged out")
    window.localStorage.removeItem("loggedBlogappUser")

    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      <div>
        Logged in as <b>{user.name} </b>
        <button onClick={(event) => handleLogoutClick(event)}>Logout</button>
      </div>
      <br></br>
      <CreateBlogForm loadBlogs={loadBlogs} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
