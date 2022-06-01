import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, setMessage, setMessageType, loadBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  //Handle update
  const handleClick = async (event) => {
    event.preventDefault()

    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    await blogService.updateExisting(updatedBlog, blog.id)
      .then((response) => {
        console.log('Updated blog: ' + JSON.stringify(response))
        loadBlogs()
        setMessageType('ok')
        setMessage(`You liked blog ${blog.title}`)
      })
      .catch((exception) => console.log('Jottain män mehtään' + exception))
  }

  console.log("Blog is visible: " + visible)

  return (
    <div>
      <div style={{ ...blogStyle, ...hideWhenVisible }}>
        <b>{blog.title}</b> - {blog.author}
        <button onClick={toggleVisibility}>Show</button>
      </div>
      <div style={{ ...blogStyle, ...showWhenVisible }}>
        <b>{blog.title}</b> - {blog.author}
        <p>{blog.url}</p>
        <p>
          Likes: {blog.likes} <button onClick={handleClick}>Like</button>
        </p>
        <p>
          <em>Posted by:</em> {blog.user.name}
        </p>
        <button onClick={toggleVisibility}>Close</button>
      </div>
    </div>
  )
}

export default Blog
