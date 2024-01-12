import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodoState} from "../todo";

export const initialState: TodoState = {
    todo: [],
    status: 'idle',
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo = {
                id: Date.now(),
                text: action.payload,
            }
            state.todo.push(newTodo)
        }
    }
})

export const {addTodo} = todoSlice.actions;

const todoReducer = todoSlice.reducer;
export default todoReducer;