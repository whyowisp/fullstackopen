import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, SELECTED_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenreFilter] = useState('')
  //const result = useQuery(ALL_BOOKS)
  const result = useQuery(SELECTED_BOOKS, {
    variables: { genre },
  })

  if (!props.show || !result.data) {
    return null
  }

  console.log('resultti: ' + result.data)
  const filteredBooks = result.data.selectedBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>book</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {
            /*filterBooks()*/ filteredBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))
          }
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
