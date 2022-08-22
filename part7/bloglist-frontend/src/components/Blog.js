import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Deletebutton } from './BlogButtons'

import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const dispatch = useDispatch()

  //Handle delete
  const handleDeleteClick = async (event) => {
    event.preventDefault()

    if (!window.confirm(`Really delete ${blog.title}?`)) return

    dispatch(deleteBlog(blog.id, blog.title))
  }

  return (
    <div className="blogDiv">
      <div style={{ ...blogStyle }}>
        <b>
          <Link to={`/blogs/${blog.id}`} state={blog.id}>
            {blog.title}
          </Link>
        </b>{' '}
        - {blog.author}{' '}
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
  username: PropTypes.string.isRequired,
}

export default Blog
