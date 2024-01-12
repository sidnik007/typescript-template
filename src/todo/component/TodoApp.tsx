import React, {useState} from "react";
import {useTodo} from "../hook/useTodo";


const TodoApp: React.FC = () => {
    const [input, setInput] = useState('')
    const {todos, addNewTodo} = useTodo();

    const handleTodo = () => {
        if (input.trim() != '') {
            addNewTodo(input);
            setInput('');
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
            <button style={styles.button} onClick={handleTodo}>Add Todo</button>
            <ul>
                {todos?.map((todo) => (
                    <li key={todo.id}>{todo.text}</li>
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