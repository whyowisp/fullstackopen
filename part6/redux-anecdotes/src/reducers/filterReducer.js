import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const sortDescending = (state) => {
  state.sort((a, b) => b.votes - a.votes) //better reverse sort method than doing sort().reverse()
}

const filterSlice = createSlice({
  name: "filter", 
  initialState,
  reducers: {
    setFiltered(state, action) {
      //Again, this is the way to update state. Don't -> state = action.payload
      console.log(state)
      return action.payload
    },
    resetFilter(state, action) {
      return initialState
    },
    upvoteFiltered(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      const updatedState = state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
      sortDescending(updatedState)
      return updatedState
    }
  }
})

export const { setFiltered, resetFilter, upvoteFiltered } = filterSlice.actions
export default filterSlice.reducer