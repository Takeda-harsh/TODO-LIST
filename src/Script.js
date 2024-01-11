import React from "react";
import  { useState } from 'react';

export default function Script () {
    
const [newTodo, makeNewTodo] = useState('');
const [todos, makeTodos] = useState([
    {id: 1, text: 'Item 1', completed: false},
    {id: 2, text: 'Item 2', completed: false},
    {id: 3, text: 'Item 3', completed: false},
    {id: 4, text: 'Item 4', completed: false},
]);

const [filter, setFilter] = useState('all');

const addTodo = () => {
    if (newTodo.trim() === '') return;

    const newTodo = [...todos, {id: todos.length + 1, text: newTodo, completed: false}]
    makeTodos(addTodo);
    makeNewTodo('');
};

const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo);
    makeTodos(updatedTodos);
};

const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !==id);
    makeTodos(updatedTodos);
};

const filteredTodos = todos.filter((todo)=>{
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true
});

}