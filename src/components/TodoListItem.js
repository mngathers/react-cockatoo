import React from "react";
import styles from "./TodoListItem.module.css";
import PropTypes from "prop-types";

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

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onRemoveTodo: PropTypes.func,
};

export default TodoListItem;
