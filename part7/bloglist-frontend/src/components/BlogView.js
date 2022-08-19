import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { updateLikesOfBlog } from '../reducers/blogReducer'

const BlogView = () => {
  //useLocation() enables getting data passed trough <Link>
  const location = useLocation()
  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()

  const id = location.state
  const currentBlog = blogs.find((currentBlog) => currentBlog.id === id)

  const handleLikeClick = async (event) => {
    event.preventDefault()
    const blogToUpdate = {
      user: currentBlog.user.id,
      likes: currentBlog.likes,
      author: currentBlog.author,
      title: currentBlog.title,
      url: currentBlog.url,
    }
    dispatch(updateLikesOfBlog(blogToUpdate, id))
    //reloadBlogs()
  }

  return (
    <div>
      <h2>
        {currentBlog.title} by {currentBlog.author}
      </h2>
      <a href={currentBlog.url}>{currentBlog.url}</a> <br></br>
      {currentBlog.likes} likes{' '}
      <button id="likeBlogButton" onClick={handleLikeClick}>
        like
      </button>{' '}
      <br></br>
      added by {currentBlog.user.username}
    </div>
  )
}

export default BlogView
