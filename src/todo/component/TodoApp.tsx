import React, {useState} from "react";
import {useTodo} from "../hook/useTodo";
import {Todo} from "../todo";


const TodoApp: React.FC = () => {
    const [input, setInput] = useState('')
    const [selectedTodoId, setSelectedTodoId] = useState(0)
    const {todos, addNewTodo, editCurrentTodo} = useTodo();

    const handleTodo = () => {
        if (input.trim() == '') return;
        if (selectedTodoId) {
            editCurrentTodo(selectedTodoId, input)
        } else {
            addNewTodo(input);
        }
        setInput('');
        setSelectedTodoId(undefined)
    }

    function handleSelectedTodo(todo: Todo) {
        if (selectedTodoId === todo.id) {
            setSelectedTodoId(undefined)
            setInput('')
        } else {
            setSelectedTodoId(todo.id)
            setInput(todo.text)
        }
    }

    return (
        <div style={styles.container}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a todo"
                style={styles.input}
            />
            <button style={styles.button} onClick={handleTodo}>{selectedTodoId ? 'Edit Todo' : 'Add Todo'}</button>
            <button style={styles.button} disabled={true}>Delete Todo</button>
            <ul>
                {todos?.map((todo) => (
                    <li
                        key={todo.id}
                        onClick={() => handleSelectedTodo(todo)}
                        style={selectedTodoId === todo.id ? {color: 'blue'} : {color: 'black'}}
                    >{todo.text}</li>
                ))}
            </ul>

        </div>
    )
}

export const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        padding: '20px'
    },
    input: {
        padding: '10px',
        border: '2px solid #007BFF',
        borderRadius: '5px',
        outline: 'none',
        fontSize: '16px'
    },
    inputFocus: {
        borderColor: '#0056b3',
        boxShadow: '0 0 5px rgba(0,123,255,0.5)'
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s'
    },
};
export default TodoApp