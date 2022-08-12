import { useState } from 'react'
import PropTypes from 'prop-types'
import { Deletebutton, Likebutton } from './BlogButtons'

import { useDispatch } from 'react-redux'
import { updateLikesOfBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, reloadBlogs, username }) => {
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

  //Handle like-update
  const handleLikeClick = async (event) => {
    event.preventDefault()

    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    dispatch(updateLikesOfBlog(updatedBlog, blog.id))
    reloadBlogs()
  }

  //Handle delete
  const handleDeleteClick = async (event) => {
    event.preventDefault()

    if (!window.confirm(`Really delete ${blog.title}?`)) return

    dispatch(deleteBlog(blog.id, blog.title))
    reloadBlogs()
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
  reloadBlogs: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default Blog
