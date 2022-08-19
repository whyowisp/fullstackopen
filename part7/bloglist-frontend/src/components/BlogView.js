import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Likebutton } from './BlogButtons'

import { updateLikesOfBlog } from '../reducers/blogReducer'

const BlogView = () => {
  const dispatch = useDispatch()
  //useLocation() enables getting data passed trough <Link>
  const location = useLocation()
  const blog = location.state

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
    //reloadBlogs()
  }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a> <br></br>
      {blog.likes} likes <Likebutton handleLikeClick={handleLikeClick} />{' '}
      <br></br>
      added by {blog.user.username}
    </div>
  )
}

export default BlogView
