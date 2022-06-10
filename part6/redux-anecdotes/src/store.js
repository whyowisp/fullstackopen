import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import messageReducer, {/*reducer functions*/} from './reducers/messageReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    message: messageReducer 
  }
})

export default store