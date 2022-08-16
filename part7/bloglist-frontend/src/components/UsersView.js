import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

const UsersView = () => {
  const users = useSelector((state) => state.users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])
  console.log(users)

  if (users) {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <th>User</th>
            <th>Blogs created</th>
          </thead>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  }
}

export default UsersView
