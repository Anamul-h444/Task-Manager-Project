import { createSlice } from "@reduxjs/toolkit";

export const summarySlice = createSlice ({
    name:'summary',
    initialState: {
        count: []
    },
    reducers:{
        countStatus: (state, action)=>{
          state.count=action.payload  
        }
       
    }
})
export const {countStatus} = summarySlice.actions
export default summarySlice.reducer