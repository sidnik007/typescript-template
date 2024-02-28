import {TodoState} from "../todo";
import {addTodo, editTodo, todoSlice} from "./todoSlice";

describe('todoSlice reducers', () => {
    it('should append a new todo item to the state', () => {
        let initialState: TodoState = todoSlice.getInitialState()
        const actualState = todoSlice.reducer(initialState, addTodo('Send email'))
        expect(actualState.todo[0].text).toEqual('Send email')
    })
    it('should edit the current todo', () => {
        let initialState: TodoState = {
            ...todoSlice.getInitialState(),
            todo: [{id: 1, text: 'Send email'}]
        }
        const currentState = todoSlice.reducer(initialState, editTodo({id: 1, text: 'Send email at 10'}))
        expect(currentState.todo[0].text).toEqual('Send email at 10')
    })
})