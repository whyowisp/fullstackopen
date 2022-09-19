import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('')
  const result = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }

  const filterBooks = () => {
    const books = result.data.allBooks
    if (genreFilter) {
      const filteredBooks = result.data.allBooks.filter((book) =>
        book.genres.includes(genreFilter)
      )
      return filteredBooks
    }
    return books
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks().map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setGenreFilter('horror')}>horror</button>
      <button onClick={() => setGenreFilter('sci-fi')}>sci-fi</button>
      <button onClick={() => setGenreFilter('history')}>history</button>
      <button onClick={() => setGenreFilter('children')}>children</button>
      <button onClick={() => setGenreFilter('music')}>music</button>
      <button onClick={() => setGenreFilter('fantasy')}>fantasy</button>
      <button onClick={() => setGenreFilter('')}>all genres</button>
    </div>
  )
}

export default Books
