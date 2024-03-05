import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import { useTodo } from "./useTodo";
import { Todo } from "../todo";
import { RootState, setupStore } from "../../store";

describe("useTodo hook action dispatching", () => {
  const initialState: RootState = {
    todos: { todo: [] as Todo[], status: "idle" as const },
  };
  const store = setupStore(initialState);

  it("adds a new todo when called", () => {
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useTodo(), { wrapper });
    act(() => {
      result.current.addNewTodo("Send email");
    });

    expect(store.getState().todos.todo).toEqual([
      { id: expect.any(Number), text: "Send email" },
    ]);
  });
});
