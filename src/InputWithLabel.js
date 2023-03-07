import React, { useEffect, useRef } from "react";

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
        <input id="todoTitle" name="title" value={todoTitle} onChange={handleTitleChange} ref={inputRef} />
        </>
    )
};

export default InputWithLabel;