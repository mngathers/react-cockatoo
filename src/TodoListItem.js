import React from "react";
import styles from "./TodoListItem.module.css";

function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li className={styles.ListItem}>
      {todo.fields.Title}
      <button type="button" onClick={() => onRemoveTodo(todo.id)}>
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
