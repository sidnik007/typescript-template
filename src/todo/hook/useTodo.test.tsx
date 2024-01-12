import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import {act} from "@testing-library/react";
import {renderHook} from "@testing-library/react-hooks";
import {Provider} from "react-redux";
import React from "react";
import {useTodo} from "./useTodo";
import {addTodo} from "../redux/todoSlice";

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
})