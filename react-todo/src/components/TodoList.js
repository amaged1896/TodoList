import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, updateTodo, addTodo } from '../redux/todosSlice';
import {
    List,
    ListItem,
    ListItemText,
    Checkbox,
    IconButton,
    TextField,
    InputAdornment,
    Paper,
    styled,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const TodoInput = styled(TextField)({
    width: '100%',
    marginBottom: 16,
});

const TodoListContainer = styled(Paper)({
    maxWidth: 400,
    margin: 'auto',
    marginTop: 24,
    padding: 16,
});

const TodoList = () => {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();
    const [editingTodo, setEditingTodo] = useState(null);
    const [inputText, setInputText] = useState('');

    const handleToggle = (id) => {
        dispatch(toggleTodo(id));
    };

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };

    const handleEdit = (id, text) => {
        setEditingTodo({ id, text });
        setInputText(text);
    };

    const handleUpdate = () => {
        if (editingTodo && inputText.trim() !== '') {
            dispatch(updateTodo({ id: editingTodo.id, text: inputText }));
            setEditingTodo(null);
            setInputText('');
        }
    };

    const handleAddTodo = () => {
        if (inputText.trim() !== '') {
            dispatch(addTodo(inputText));
            setInputText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default Enter key behavior
            if (editingTodo) {
                handleUpdate();
            } else {
                handleAddTodo();
            }
        }
    };

    return (
        <TodoListContainer elevation={3}>
            <TodoInput
                label={editingTodo ? 'Edit todo' : 'Add a new todo'}
                variant="outlined"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={editingTodo ? handleUpdate : handleAddTodo}>
                                {editingTodo ? <EditIcon /> : <AddIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <List>
                {todos.map((todo) => (
                    <ListItem
                        key={todo.id}
                        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        <Checkbox checked={todo.completed} onChange={() => handleToggle(todo.id)} />
                        <ListItemText primary={todo.text} />
                        <IconButton onClick={() => handleEdit(todo.id, todo.text)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(todo.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </TodoListContainer>
    );
};

export default TodoList;
