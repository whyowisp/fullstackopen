import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} username={user.name} />
      ))}
    </div>
  )
}

export default BlogList
