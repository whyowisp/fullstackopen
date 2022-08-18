import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../reducers/loggedInUserReducer'

const UserInfo = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogoutClick = (event) => {
    event.preventDefault()
    console.log(user.name + ' logged out')
    window.localStorage.removeItem('loggedBlogappUser')

    dispatch(clearUser())
  }

  return (
    <inline>
      Logged in as <b>{user.name} </b>
      <button id="logoutButton" onClick={(event) => handleLogoutClick(event)}>
        logout
      </button>
    </inline>
  )
}

export default UserInfo
