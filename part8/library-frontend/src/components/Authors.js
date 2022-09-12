import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthyearForm authors={authors} />
    </div>
  )
}

const BirthyearForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [setBornTo, setBirth] = useState('')

  const [editBirthyear] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const submit = async (event) => {
    event.preventDefault()

    //NoteToSelf: variable setBornTo must be named same as it is named in server
    editBirthyear({ variables: { name, setBornTo } })
    setName('')
    setBirth('')
  }

  return (
    <div>
      <h3>Set birth year</h3>
      <form onSubmit={submit}>
        <div>
          name{' '}
          <select onChange={(event) => setName(event.target.value)}>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born{' '}
          <input
            value={setBornTo}
            onChange={({ target }) => setBirth(parseInt(target.value))}
          />
        </div>
        <button type="submit">update</button>
      </form>
    </div>
  )
}

export default Authors
