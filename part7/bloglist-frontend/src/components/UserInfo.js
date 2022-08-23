import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'

import { clearUser } from '../reducers/loggedInUserReducer'

const UserInfo = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogoutClick = (event) => {
    event.preventDefault()
    console.log(user.name + ' logged out')
    window.localStorage.removeItem('loggedBlogappUser')

    dispatch(clearUser())
    navigate('/')
  }

  return (
    <div>
      <Typography variant="overline">
        Logged in as <b>{user.name} </b>
      </Typography>
      <Button
        variant="outlined"
        size="small"
        id="logoutButton"
        onClick={(event) => handleLogoutClick(event)}
      >
        logout
      </Button>
    </div>
  )
}

export default UserInfo
