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
        },
        editTodo: (state, action: PayloadAction<{ id: number, text: string }>) => {
            const todoItem = state.todo.find(t => t.id === action.payload.id)
            if (todoItem) {
                todoItem.text = action.payload.text
            }

        }
    }
})

export const {addTodo, editTodo} = todoSlice.actions;

const todoReducer = todoSlice.reducer;
export default todoReducer;