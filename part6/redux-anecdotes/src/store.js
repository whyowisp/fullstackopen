import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdotes'


const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    message: messageReducer,
    filter: filterReducer 
  }
})

anecdoteService.getAll().then(anecdotes => store.dispatch(setAnecdotes(anecdotes)))

export default store 