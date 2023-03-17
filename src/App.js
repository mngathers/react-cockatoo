import { useEffect, useState } from "react";
import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve({
          data: { todoList: JSON.parse(localStorage.getItem("savedTodoList")) },
        });
      }, 2000)
    ).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  const addTodo = (newTodo) => {
    setTodoList((previousTodoList) => [...previousTodoList, newTodo]);
  };

  function removeTodo(id) {
    setTodoList((filteredArray) =>
      filteredArray.filter((todo) => todo.id !== id)
    );
  }

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}

export default App;
