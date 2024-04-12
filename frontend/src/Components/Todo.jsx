import React, { useEffect, useState } from "react";
import Table from "../Components/todo/Table";
import TodoForm from "../Components/todo/TodoForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchTodo } from "../features/todo/todoSlice";
import { useNavigate } from "react-router-dom";

export default function Todo() {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      dispatch(fetchTodo());
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const Back = () => {
    navigate(-1);
  };

  return (
    <div className="bg-indigo-100 px-8 min-h-screen">
      <button
        onClick={Back}
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Back to Home
      </button>
      <nav className="pt-12">
        <h1 className="text-5xl text-center pb-8 text-gray-900">Todo List</h1>
      </nav>
      <TodoForm />
      <Table />
    </div>
  );
}
