import { useLocation } from 'react-router-dom'
import { Likebutton } from './BlogButtons'

const BlogView = () => {
  //useLocation() enables getting data passed trough <Link>
  const location = useLocation()
  const blog = location.state
  console.log(blog)
  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a> <br></br>
      {blog.likes} likes{' '}
      <Likebutton
        handleLikeClick={() => {
          return null
        }}
      />{' '}
      <br></br>
      added by {blog.user.username}
    </div>
  )
}

export default BlogView
