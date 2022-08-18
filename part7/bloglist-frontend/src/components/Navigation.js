import { Link } from 'react-router-dom'
import UserInfo from './UserInfo'

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
}

export default Navigation
