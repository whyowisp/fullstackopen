import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setMessage } from '../reducers/messageReducer'
import { setUser } from '../reducers/loggedInUserReducer'

import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ reloadBlogs }) => {
  //Login form related states. Cleared after login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

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

      reloadBlogs()
    } catch (exception) {
      dispatch(setMessage({ message: 'Login failed', type: 'error' }))
    }
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form className="loginform" onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
