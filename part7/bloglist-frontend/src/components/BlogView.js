import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { updateLikesOfBlog } from '../reducers/blogReducer'

const BlogView = () => {
  const dispatch = useDispatch()
  //useLocation() enables getting data passed trough <Link>
  const location = useLocation()

  const blogs = useSelector((state) => state.blogs)

  const id = location.state
  const currentBlog = blogs.find((currentBlog) => currentBlog.id === id)

  const handleLikeClick = async (event) => {
    event.preventDefault()
    const blogToUpdate = {
      user: currentBlog.user.id, //Note to self: user is a id in blog data structure
      likes: currentBlog.likes,
      author: currentBlog.author,
      title: currentBlog.title,
      url: currentBlog.url,
    }
    dispatch(updateLikesOfBlog(blogToUpdate, id))
  }

  /*const handleNewComment = async (event) => {
    event.preventDefault
  }*/

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
      <h3>Comments</h3>
      <ul>
        {currentBlog.comments.map((n) => (
          <li key={n.id}>{n.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogView
