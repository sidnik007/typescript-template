import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {addTodo} from "../redux/todoSlice";

export const useTodo = () => {
    const todos = useSelector((state: RootState) => state.todos.todo);

    const dispatch = useDispatch<AppDispatch>();

    const addNewTodo = useCallback((text: string) => {
        dispatch(addTodo(text));
    }, [dispatch]);

    return {
        todos,
        addNewTodo
    }
}
