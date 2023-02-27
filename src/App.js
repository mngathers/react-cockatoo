import {useEffect, useState} from "react"
import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

const useSemiPersistentState = () => {
  const [todoList, setTodoList] = React.useState(
    JSON.parse(localStorage.getItem("savedTodoList")));
  
  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList))}, [todoList]
  );

  return [todoList, setTodoList];
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();
  
  const addTodo = (newTodo) => {
    setTodoList( (previousTodoList) => [...previousTodoList, newTodo])
 };

  function removeTodo(id) {
    let filteredArray = (todoList.filter(todo => todo.id !== id))
    setTodoList(filteredArray)
  };
  
  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

export default App;