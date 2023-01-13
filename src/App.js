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

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(function(item) {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;