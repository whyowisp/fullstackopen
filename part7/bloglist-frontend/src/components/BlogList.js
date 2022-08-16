import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ reloadBlogs }) => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          reloadBlogs={() => reloadBlogs}
          username={user.name}
        />
      ))}
    </div>
  )
}

export default BlogList
