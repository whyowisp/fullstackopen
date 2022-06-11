import { createSlice } from "@reduxjs/toolkit";

const initialState = []

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
    }
  }
})

export const { setFiltered, resetFilter } = filterSlice.actions
export default filterSlice.reducer