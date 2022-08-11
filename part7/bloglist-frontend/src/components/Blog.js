import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { Deletebutton, Likebutton } from './BlogButtons'

import { useDispatch } from 'react-redux'
import { setMessage } from '../reducers/messageReducer'

const Blog = ({ blog, loadBlogs, username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

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
        dispatch(
          setMessage({
            message: `You liked blog ${blog.title}`,
            type: 'ok',
          })
        )
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
        dispatch(
          setMessage({
            message: `Blog ${blog.title} deleted`,
            type: 'ok',
          })
        )
      })
      .catch((error) => console.log('Poop hit the fan: ' + error))
  }

  return (
    <div className="blogDiv">
      <div style={{ ...blogStyle, ...hideWhenVisible }} id="detailsHidden">
        <b>{blog.title}</b> - {blog.author}
        <button id="showDetailsButton" onClick={toggleVisibility}>
          Show
        </button>
      </div>
      <div style={{ ...blogStyle, ...showWhenVisible }} id="detailsVisible">
        <b>{blog.title}</b> - {blog.author}
        <button onClick={toggleVisibility}>Hide</button>
        <p>{blog.url}</p>
        <p>
          Likes: {blog.likes} <Likebutton handleLikeClick={handleLikeClick} />
        </p>
        <p>
          <em>Posted by:</em> {blog.user.name}
        </p>
        <Deletebutton
          handleDeleteClick={handleDeleteClick}
          username={username}
          blogUserName={blog.user.name}
        />
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loadBlogs: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default Blog
