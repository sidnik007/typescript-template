import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import TodoApp from "./TodoApp";
import {addTodo} from "../redux/todoSlice";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('TodoApp', () => {
    describe('Add a todo', () => {
        let store;

        beforeEach(() => {
            const initialState = {todos: {todos: [], status: 'idle'}};
            store = mockStore(initialState);

            render(
                <Provider store={store}>
                    <TodoApp/>
                </Provider>
            );
        })


        it('accepts a todo input', () => {
            const input = screen.getByPlaceholderText('Enter a todo')
            expect(input).toBeInTheDocument()
        })

        it('provides a button to add todo', () => {
            const button = screen.getByRole('button', {name: /Add Todo/i})
            expect(button).toBeInTheDocument()
        })

        it('adds todo to the state', () => {
            const input = screen.getByPlaceholderText('Enter a todo')
            fireEvent.input(input, {target: {value: 'Send email'}});

            const button = screen.getByRole('button', {name: /Add Todo/i})
            fireEvent.click(button)

            expect(store.getActions()).toContainEqual(addTodo('Send email'));
        })
    })
    describe('display todo list', () => {
        it('displays added todo in the list', () => {
            const initialState = {
                todos: {
                    todo: [{id: 1, text: 'Send email'}],
                    status: 'idle',
                },
            };
            const store = mockStore(initialState);

            render(
                <Provider store={store}>
                    <TodoApp/>
                </Provider>
            );
            expect(screen.getByText('Send email')).toBeInTheDocument();
        })
    })

    // on selecting the todo item
    // ---- the text should be blue
    // ---- the text field should be prefilled with selected text
    // ---- the button should have text "Edit Todo"
    // on deselecting the todo item
    // ---- the text should be black
    // ---- the text field should be empty
    // ---- the button should have text "Add Todo"
    // the todo item is edited
})


// const input = screen.getByPlaceholderText('Enter a todo') as HTMLInputElement
// fireEvent.input(input, {target: {value: 'Write blog'}});
// const button = screen.getByRole('button', {name: /Edit Todo/i})
// fireEvent.click(button)
// expect(store.getActions()).toContainEqual(editTodo({id: 1, text: 'Write blog'}));
