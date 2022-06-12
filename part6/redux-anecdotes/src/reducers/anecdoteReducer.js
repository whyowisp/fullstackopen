const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const sortDescending = (state) => {
  state.sort((a, b) => b.votes - a.votes) //better reverse sort method than doing sort().reverse()
}

const reducer = (state = initialState, action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch (action.type) {
    case 'UPVOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      const updatedState = state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
      sortDescending(updatedState)
      return updatedState
    }
    case 'CREATE': {
      return [...state, action.data]
    }
    default: return state
  }
}

export const upvote = (id) => {
  return {
    type: 'UPVOTE',
    data: { id }
  }
}

export const createNew = (content) => {
  return {
    type: 'CREATE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export default reducer