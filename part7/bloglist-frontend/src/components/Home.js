import Notification from './Notification'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const Home = ({ user, blogs, reloadBlogs }) => {
  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm reloadBlogs={reloadBlogs} />
      </div>
    )
  }
  //blogs existence must be checked, otherwise rendering (inexistent) variables causes errors
  else if (blogs) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <br></br>
        <Togglable buttonLabel="new blog">
          <BlogForm reloadBlogs={reloadBlogs} />
        </Togglable>
        <BlogList />
      </div>
    )
  }
}

export default Home
