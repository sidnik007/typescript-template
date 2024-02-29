import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import TodoApp from "./TodoApp";
import {addTodo, editTodo} from "../redux/todoSlice";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function createEmptyTodoList() {
    const initialState = {todos: {todos: [], status: 'idle'}};
    const store = mockStore(initialState);

    render(
        <Provider store={store}>
            <TodoApp/>
        </Provider>
    );
    return store;
}

function createTodoListWithOneItem() {
    const initialState = {
        todos: {
            todo: [{id: 1, text: 'Send email'}],
            status: 'idle',
        },
    };
    let store = mockStore(initialState);

    render(
        <Provider store={store}>
            <TodoApp/>
        </Provider>
    );
    return store;
}

describe('TodoApp', () => {
    describe('Add a todo', () => {
        let store;

        beforeEach(() => {
            store = createEmptyTodoList();
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

    describe('Edit Todo', () => {
        let todoItem: HTMLElement
        let store
        beforeEach(() => {
            store = createTodoListWithOneItem();
            todoItem = screen.getByText('Send email')
            fireEvent.click(todoItem)
        })
        describe('on selecting the todo item', () => {
            it('changes the text color to blue', () => {
                expect(todoItem).toHaveStyle('color: blue')
            })
            it('should prefill the text with selected todo item', () => {
                const input = screen.getByPlaceholderText('Enter a todo') as HTMLInputElement
                expect(input.value).toBe('Send email')
            })
            it('changes the text of the button to Edit text', () => {
                const button = screen.getByRole('button', {name: /Edit Todo/i}) as HTMLButtonElement
                expect(button.textContent).toBe('Edit Todo')
            });
        })
        describe('on deselecting the todo item', () => {
            beforeEach(() => {
                fireEvent.click(todoItem)
            })
            it('changes the color black', () => {
                expect(todoItem).toHaveStyle('color: black')
            })
            it('removes the prefilled text', () => {
                const input = screen.getByPlaceholderText('Enter a todo') as HTMLInputElement
                expect(input.value).toBe('')
            })
            it('changes the text of the button to Add Todo', () => {
                const button = screen.getByRole('button', {name: /Add Todo/i}) as HTMLButtonElement
                expect(button.textContent).toBe('Add Todo')
            });
        })
        it('dispatches a edit todo action', () => {
            const input = screen.getByPlaceholderText('Enter a todo') as HTMLInputElement
            fireEvent.input(input, {target: {value: 'Send email at 10'}})
            const button = screen.getByRole('button', {name: /Edit Todo/i}) as HTMLButtonElement
            fireEvent.click(button)
            expect(store.getActions()).toContainEqual(editTodo({id: 1, text: 'Send email at 10'}));
            expect(button.textContent).toBe('Add Todo')
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

    describe('Delete todo', () => {
        it('delete button exist', () => {
            createEmptyTodoList()
            const deleteButton = screen.getByRole('button', {name: /Delete Todo/i}) as HTMLButtonElement
            expect(deleteButton).toBeVisible()
        })
        it('is disabled by default', () => {
            createEmptyTodoList()
            const deleteButton = screen.getByRole('button', {name: /Delete Todo/i}) as HTMLButtonElement
            expect(deleteButton).toBeDisabled()
            expect(deleteButton).toHaveStyle('color: white')
        })
        it('is enabled when a todo item is clicked', () => {
            createTodoListWithOneItem()
            const todoItem = screen.getByText('Send email')
            fireEvent.click(todoItem)
            const deleteButton = screen.getByRole('button', {name: /Delete Todo/i}) as HTMLButtonElement
            expect(deleteButton).toBeEnabled()
        });

    })
})