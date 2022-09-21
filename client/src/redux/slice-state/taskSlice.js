import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice ({
    name:'task',
    initialState: {
        new: [],
        progress:[],
        cancel:[],
        complete:[]

    },
    reducers:{
        setNewTask: (state, action)=>{
          state.new= action.payload
        },
        setProgressTask: (state, action)=>{
            state.progress= action.payload
          },
          setCancelTask: (state, action)=>{
            state.cancel= action.payload
          },
          setCompleteTask: (state, action)=>{
            state.complete= action.payload
          }
    }
})
export const {setNewTask, setProgressTask,setCancelTask, setCompleteTask } = taskSlice.actions
export default taskSlice.reducer