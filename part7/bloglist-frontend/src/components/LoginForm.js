import { useDispatch } from 'react-redux'

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

      //reloadBlogs()
    } catch (exception) {
      console.log(exception)
      dispatch(setMessage({ message: 'Login failed', type: 'error' }))
    }
  }

  return (
    <div>
      <form className="loginform" onSubmit={handleLogin}>
        <div>
          username
          <input type="text" name="username" />
        </div>
        <div>
          password
          <input type="password" name="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
