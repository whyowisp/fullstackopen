import { connect } from "react-redux"

import { setFiltered, resetFilter, upvoteFiltered } from "../reducers/filterReducer"
import { upvoteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const Filter = (props) => {
  const style = {
    marginBottom: 10,
  }

  const vote = (anecdote) => {
    //dispatch to original anecdotes
    props.upvoteAnecdote(anecdote)
    //dispatch to filtered anecdotes
    props.upvoteFiltered(anecdote.id)

    props.setNotification(`You voted "${anecdote.content}"`, 5)
  }

  const handleChange = (event) => {
    event.preventDefault()

    if (!event.target.value) {
      props.resetFilter()
      return
    }

    const filteredAnecdotes = props.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(event.target.value)
    )
    props.setFiltered(filteredAnecdotes)
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
      {props.filter.map((anecdote) => (
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  setFiltered,
  resetFilter, 
  upvoteFiltered,
  upvoteAnecdote,
  setNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter)
