import anecdoteService from "../services/anecdotes"

const sortDescending = (state) => {
  state.sort((a, b) => b.votes - a.votes) //better reverse sort method than doing sort().reverse()
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case "UPVOTE": {
      const id = action.data.id
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      const updatedState = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
      sortDescending(updatedState)
      return updatedState
    }
    case "CREATE": {
      return [...state, action.data.content]
    }
    case "INITIALIZE": {
      return action.data.content
    }
    default:
      return state
  }
}

export const upvote = (id) => {
  return {
    type: "UPVOTE",
    data: { id },
  }
}

export const createNew = (content) => {
  return {
    type: "CREATE",
    data: {
      content,
    },
  }
}

export const setAnecdotes = (content) => {
  return {
    type: "INITIALIZE",
    data: { content },
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    //Obs! same function name 'createNew' in both anecdoteService and anecdoteReducer
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createNew(newAnecdote))
  }
}

export const upvoteAnecdote = (id, content) => {
  return async dispatch => {
    const upvotedAnecdote = await anecdoteService.upvoteExisting(id, content)
    dispatch(upvote(upvotedAnecdote.id))
  }
}

export default reducer
