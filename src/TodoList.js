import React from 'react';

const todoList = [
    {
      id: 1,
      title: "Complete coding assignment",
    },
    {
      id: 2,
      title: "Go grocery shopping",
    },
    {
      id: 3,
      title: "Study for React class",
    },
  ];

function TodoList() {
    return (
        <ul>
            {todoList.map((item) => <li key={item.id}>{item.title}</li>)}
        </ul>
    );
}

export default TodoList;