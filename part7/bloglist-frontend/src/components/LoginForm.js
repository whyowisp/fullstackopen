import { useDispatch } from 'react-redux'
import { TextField, Button } from '@mui/material'

import { setMessage } from '../reducers/messageReducer'
import { setUser } from '../reducers/loggedInUserReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    try {
      const user = await loginService.login({
        username,
        password,
      })

      //user login related stuff
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setMessage({ message: 'Login successful', type: 'ok' }))
    } catch (exception) {
      console.log(exception)
      dispatch(setMessage({ message: 'Login failed', type: 'error' }))
    }
  }

  return (
    <div>
      <form className="loginform" onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            variant="filled"
            type="text"
            name="username"
          />
        </div>
        <div>
          <TextField
            label="password"
            variant="filled"
            type="password"
            name="password"
          />
        </div>
        <Button variant="contained" type="submit">
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
