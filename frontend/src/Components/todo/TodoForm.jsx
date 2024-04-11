import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../features/todo/todoSlice";

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState({
    body: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setNewTodo((pre) => ({
      ...pre,
      body: e.target.value,
    }));
  };

  const postTodo = async () => {
    try {
      dispatch(addTodo(newTodo));
      setNewTodo({ body: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-left">
      <input
        type="text"
        placeholder="Add Todo"
        className="input border w-full max-w-xs "
        onChange={handleChange}
        value={newTodo.body}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            postTodo();
          }
        }}
      />
      <button className="btn btn-primary ml-2" onClick={postTodo}>
        Add todo
      </button>
    </div>
  );
};

export default TodoForm;
