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
    Paper,
    styled,
    Typography,
    Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n.js';

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
    const { t } = useTranslation();

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
        if (editingTodo && inputText !== '') {
            dispatch(updateTodo({ id: editingTodo.id, text: inputText }));
            setEditingTodo(null);
            setInputText('');
        }
    };

    const handleAddTodo = () => {
        if (inputText !== '') {
            dispatch(addTodo(inputText));
            setInputText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (editingTodo) {
                handleUpdate();
            } else {
                handleAddTodo();
            }
        }
    };


    const toggleLanguage = () => {
        const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLanguage);
    };

    return (
        <TodoListContainer elevation={3} >
            <Button variant="outlined" onClick={toggleLanguage}>
                {i18n.language === 'en' ? 'عربي' : 'English'}
            </Button>
            <Typography dir={i18n.language === "ar" ? "rtl" : "ltr"} variant="h5" gutterBottom>
                {t('title')}
            </Typography>
            <TodoInput
                dir={i18n.language === "ar" ? "rtl" : "ltr"}
                label={editingTodo ? t('edit') : t('toDo')}
                placeholder={t('placeholder')}
                style={{ textAlign: i18n.language === "ar" ? "right" : "left" }}
                variant="outlined"
                value={inputText}
                rules={{ required: 'Todo text is required' }}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                InputProps={{
                    endAdornment: (
                        <div style={{ position: 'absolute', right: 0 }}>
                            <IconButton onClick={editingTodo ? handleUpdate : handleAddTodo}>
                                {editingTodo ? <EditIcon /> : <AddIcon />}
                            </IconButton>
                        </div>
                    ),
                }}
            />

            <List dir={i18n.language === "ar" ? "rtl" : "ltr"}>
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
