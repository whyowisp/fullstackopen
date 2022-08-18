import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserBlogs = () => {
  const id = useParams().id //Note to self: <Link /> sets url:s id  ->  <Route /> uses it  ->  useParams looks both <Route /> and url to find it out.
  const allBlogs = useSelector((state) => state.blogs)
  const userBlogs = allBlogs.filter((blog) => blog.user.id === id)
  const header =
    userBlogs.length > 0 ? (
      <h2>User {userBlogs[0].user.name} blogs</h2>
    ) : (
      <p>No blogs from requested user</p>
    )

  return (
    <div>
      {header}
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlogs
