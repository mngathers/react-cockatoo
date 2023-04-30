import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function InputWithLabel({ children, todoTitle, handleTitleChange }) {
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <label htmlFor="todoTitle">{children} </label>
      <input
        id="todoTitle"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef}
      />
    </>
  );
}

InputWithLabel.propTypes = {
  children: PropTypes.string,
  todoTitle: PropTypes.string,
  handleTitleChange: PropTypes.func,
};

export default InputWithLabel;
