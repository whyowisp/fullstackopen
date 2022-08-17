import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const UserBlogs = () => {
  const id = useParams().id //Note to self: <Link /> sets url:s id -> <Route /> uses it -> useParams looks both <Route /> and url to find it out.
  const allBlogs = useSelector((state) => state.blogs)
  const userBlogs = allBlogs.filter((blog) => blog.user.id === id)
  return (
    <div>
      <Link to="/"> home </Link>
      <Link to="/users"> users </Link>
      <h2>Users blogs</h2>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlogs
