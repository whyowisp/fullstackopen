import { Link } from 'react-router-dom'

import Notification from './Notification'
import LoginForm from './LoginForm'
import UserInfo from './UserInfo'
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
        <Link to="/"> home </Link>
        <Link to="/users"> users </Link>
        <h2>blogs</h2>
        <Notification />
        <UserInfo />
        <br></br>
        <Togglable buttonLabel="New blog">
          <BlogForm reloadBlogs={reloadBlogs} />
        </Togglable>
        <BlogList />
      </div>
    )
  }
}

export default Home
