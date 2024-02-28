import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {addTodo, editTodo} from "../redux/todoSlice";

export const useTodo = () => {
    const todos = useSelector((state: RootState) => state.todos.todo);

    const dispatch = useDispatch<AppDispatch>();

    const addNewTodo = useCallback((text: string) => {
        dispatch(addTodo(text));
    }, [dispatch]);

    const editCurrentTodo = useCallback((id: number, text: string) => {
        dispatch(editTodo({id: id, text: text}))
    }, [dispatch]);
    return {
        todos,
        addNewTodo,
        editCurrentTodo

    }
}
