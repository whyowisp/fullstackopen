import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import Deletebutton from '../components/deletebutton'

const Blog = ({ blog, setMessage, setMessageType, loadBlogs, username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  //Handle update
  const handleLikeClick = async (event) => {
    event.preventDefault()

    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    await blogService
      .updateBlog(updatedBlog, blog.id)
      .then((response) => {
        console.log('Updated blog: ' + JSON.stringify(response))
        loadBlogs()
        setMessageType('ok')
        setMessage(`You liked blog ${blog.title}`)
      })
      .catch((exception) => console.log('Blog update failed: ' + exception))
  }

  const handleDeleteClick = async (event) => {
    event.preventDefault()

    if (!window.confirm(`Really delete ${blog.title}?`)) return

    await blogService
      .deleteBlog(blog.id)
      .then((response) => {
        console.log(response)
        loadBlogs()
        setMessageType('ok')
        setMessage(`Blog ${blog.title} deleted`)
      })
      .catch((error) => console.log('Poop hit the fan: ' + error))
  }

  return (
    <div>
      <div style={{ ...blogStyle, ...hideWhenVisible }} id='hidden'>
        <b>{blog.title}</b> - {blog.author}
        <button onClick={toggleVisibility}>Show</button>
      </div>
      <div style={{ ...blogStyle, ...showWhenVisible }}>
        <b>{blog.title}</b> - {blog.author}
        <button onClick={toggleVisibility}>Hide</button>
        <p>{blog.url}</p>
        <p>
          Likes: {blog.likes} <button onClick={handleLikeClick}>Like</button>
        </p>
        <p>
          <em>Posted by:</em> {blog.user.name}
        </p>
        <Deletebutton handleDeleteClick={handleDeleteClick} username={username} blogUserName={blog.user.name} />
      </div>
    </div>
  )
}

//blog, setMessage, setMessageType, loadBlogs, username
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
  setMessageType: PropTypes.func.isRequired,
  loadBlogs: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog
