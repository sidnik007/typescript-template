import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import {act, renderHook} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";
import {useTodo} from "./useTodo";
import {addTodo, editTodo} from "../redux/todoSlice";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('useTodo hook action dispatching', () => {
    const initialState = {todos: {todos: [], status: 'idle'}};
    const store = mockStore(initialState);

    it('dispatches addTodo action with correct payload', () => {
        const store = mockStore(initialState);

        const wrapper = ({children}) => (
            <Provider store={store}>{children}</Provider>
        );

        const {result} = renderHook(() => useTodo(), {wrapper});
        act(() => {
            result.current.addNewTodo('Send email');
        });

        expect(store.getActions()).toContainEqual(addTodo('Send email'));

    })
    it('dispatches editTodo action with correct payload', () => {
        const store = mockStore(initialState);

        const wrapper = ({children}) => (
            <Provider store={store}>{children}</Provider>
        );

        const {result} = renderHook(() => useTodo(), {wrapper});
        act(() => {
            result.current.editCurrentTodo(1, 'Send email at 10');
        });

        expect(store.getActions()).toContainEqual(editTodo({id: 1, text: 'Send email at 10'}));

    })
})