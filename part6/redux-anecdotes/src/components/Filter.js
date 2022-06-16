import { useSelector, useDispatch } from "react-redux"

import { setFiltered, resetFilter, upvoteFiltered } from "../reducers/filterReducer"
import { upvoteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const Filter = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filtered = useSelector((state) => state.filter)
  //console.log("filtered results: " + JSON.stringify(filtered))
  const dispatch = useDispatch()
  const style = {
    marginBottom: 10,
  }

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    //dispatch to original anecdotes
    dispatch(upvoteAnecdote(anecdote))
    //dispatch to filtered anecdotes
    dispatch(upvoteFiltered(anecdote.id))

    dispatch(setNotification(`You voted "${anecdote.content}"`, 10))
  }

  const handleChange = (event) => {
    event.preventDefault()

    if (!event.target.value) {
      dispatch(resetFilter())
      return
    }

    const filteredAnecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(event.target.value)
    )
    dispatch(setFiltered(filteredAnecdotes))
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
      {filtered.map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Filter
