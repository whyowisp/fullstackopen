import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'

const Deletebutton = ({ handleDeleteClick, username, blogUserName }) => {
  if (username === blogUserName) {
    return (
      <Button
        variant="text"
        startIcon={<DeleteIcon />}
        id="deleteButton"
        onClick={handleDeleteClick}
      >
        remove
      </Button>
    )
  } else {
    return <p>Cannot remove</p>
  }
}

const Blog = ({ blog, username }) => {
  /*Some old styling to be removed
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }*/

  const dispatch = useDispatch()

  //Handle delete
  const handleDeleteClick = async (event) => {
    event.preventDefault()

    if (!window.confirm(`Really delete ${blog.title}?`)) return

    dispatch(deleteBlog(blog.id, blog.title))
  }

  return (
    <div className="blogDiv">
      <Typography variant="button">
        <b>
          <Link to={`/blogs/${blog.id}`} state={blog.id}>
            {blog.title}
          </Link>
        </b>{' '}
        - {blog.author}{' '}
      </Typography>
      <div align="right">
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
