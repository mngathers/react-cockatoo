import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import styles from "./App.module.css";
import Navigation from "./components/Navigation";
import About from "./components/About";

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [order, setOrder] = React.useState(true);

  useEffect(() => {
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_ID}/?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.records);

        order
          ? result.records.sort((objectA, objectB) => {
              if (objectA.fields.Title < objectB.fields.Title) {
                return -1;
              } else if (objectA.fields.Title === objectB.fields.Title) {
                return 0;
              } else {
                return 1;
              }
            })
          : result.records.sort((objectA, objectB) => {
              if (objectA.fields.Title < objectB.fields.Title) {
                return 1;
              } else if (objectA === objectB) {
                return 0;
              } else {
                return -1;
              }
            });
        setTodoList(result.records);
        setIsLoading(false);
      })
      .catch((error) => console.log(error.message));
  }, [order]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  const addTodo = (newTodo) => {
    const airtableData = {
      fields: {
        Title: newTodo.title,
      },
    };

    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(airtableData),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setTodoList((todoList) => [...todoList, result]);
        setOrder((order) => [...todoList, order]);
      });
  };

  function removeTodo(id) {
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_ID}/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.deleted) {
          console.log(result);
          setTodoList((filteredArray) =>
            filteredArray.filter((todo) => todo.id !== result.id)
          );
        }
      });
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <>
              <Navigation />
              <h1>To-Do List</h1>
              <button
                type="button"
                name="Desc"
                onClick={(order) => setOrder(false)}
              >
                z-a
              </button>
              <button
                type="button"
                name="sort"
                onClick={(order) => setOrder(true)}
              >
                a-z
              </button>
              <AddTodoForm onAddTodo={addTodo} />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              )}
            </>
          }
        />
        <Route
          path="/new"
          element={
            <>
              <Navigation />
              <h1>New To-Do List</h1>
            </>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
