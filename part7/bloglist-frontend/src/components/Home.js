import { Typography } from '@mui/material'

import Notification from './Notification'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const Home = ({ user, blogs }) => {
  if (!user) {
    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Log in
        </Typography>
        <Notification />
        <LoginForm />
      </div>
    )
  }
  //blogs existence must be checked, otherwise rendering (inexistent) variables causes errors
  else if (blogs) {
    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Blogs App
        </Typography>
        <Notification />
        <br></br>
        <Togglable buttonLabel="new blog">
          <BlogForm />
        </Togglable>
        <BlogList />
      </div>
    )
  }
}

export default Home
