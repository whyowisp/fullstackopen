import { Link } from 'react-router-dom'
import { Breadcrumbs } from '@mui/material'
import UserInfo from './UserInfo'

//New navigation component with MUI for ex 7.21
const Navigation = ({ user }) => {
  return (
    <div>
      {user ? (
        <div>
          <Breadcrumbs>
            <Link to="/">home</Link> <Link to="/users">users</Link> <UserInfo />
          </Breadcrumbs>
        </div>
      ) : (
        console.log('User not logged in')
      )}
    </div>
  )
}
/*Old navigation component for exercise 7.17

const Navigation = ({ user }) => {
  const nav = {
    background: 'lightgrey',
    padding: 2,
  }
  return (
    <div>
      {user ? (
        <div style={{ ...nav }}>
          <Link to="/">home</Link> <Link to="/users">users</Link> <UserInfo />
        </div>
      ) : (
        console.log('User not logged in')
      )}
    </div>
  )
}*/

export default Navigation
