import {createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchTodo = createAsyncThunk('todos/fetchTodos',async ()=>{
    const response = await axios.get('http://127.0.0.1:8000/api/todo/')
    return response.data
})

export const addTodo = createAsyncThunk('todos/addtodo',async(data)=>{
    const response = await axios.post("http://127.0.0.1:8000/api/todo/",data)
    return response.data
})

export const deletetodo = createAsyncThunk('todos/deletetodo',async(id)=>{
    const response = await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)
    return id
})

export const updatetodo = createAsyncThunk(
    'todos/updatetodo',
    async ({ id, value }, { rejectWithValue }) => {
      try {
        const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value);
        return response.data;

      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  


const todoSlice = createSlice({
    name:'todo',
    initialState:{
        todoList:   [],
        status:'idle',
        error:null,
    },
    reducers :{},
    extraReducers:(builder)=>{
        builder.addCase(fetchTodo.pending, (state) =>{
            state.status = 'loading'
        }).addCase(fetchTodo.fulfilled, (state, action) =>{
            state.status = 'succeeded'
            state.todoList = action.payload
        }).addCase(fetchTodo.rejected, (state, action) =>{
            state.status = 'failed'
            state.error = action.error.message
        }).addCase(addTodo.fulfilled, (state,action) =>{
            state.todoList.push(action.payload)
        }).addCase(deletetodo.fulfilled, (state,action) =>{
            state.todoList = state.todoList.filter((todo)=> todo.id !== action.payload)
        }).addCase(updatetodo.fulfilled, (state,action) =>{
            const {id, data} = action.payload;
            const existingTodo = state.todoList.find((todo)=> todo.id === id );
            if (existingTodo){
                existingTodo.data = data
            }
            
        })

    }
 

})

export const selectTodos = (state) => state.todoList.todo

export default todoSlice.reducer