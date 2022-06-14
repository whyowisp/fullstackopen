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

export default reducer
