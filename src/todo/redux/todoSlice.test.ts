import {TodoState} from "../todo";
import {addTodo, todoSlice} from "./todoSlice";

describe('todoSlice reducers', () => {
    let initialState: TodoState = todoSlice.getInitialState()
    it('should append a new todo item to the state', () => {
        const actualState = todoSlice.reducer(initialState, addTodo('Send email'))
        expect(actualState.todo[0].text).toEqual('Send email')
    })
})