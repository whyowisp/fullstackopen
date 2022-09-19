import { useQuery } from '@apollo/client'
import { ALL_BOOKS, USER } from '../queries'
import Books from './Books'

const Recommendations = (props) => {
  const user = useQuery(USER)
  const books = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  const recommendedBooks = books.data.allBooks.filter((book) =>
    book.genres.includes(user.data.me.favouriteGenre)
  )

  return (
    <div>
      <h3>recommendations</h3>
      <p>book in your favourite genre</p>
      <b>{user.data.me.username}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
