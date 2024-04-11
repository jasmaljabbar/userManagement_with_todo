import React, { useEffect, useState } from "react";
import Table from "../Components/todo/Table";
import TodoForm from "../Components/todo/TodoForm";
import { useDispatch } from "react-redux";
import { fetchTodo } from "../features/todo/todoSlice";
import { useNavigate } from 'react-router-dom'

export default function Todo() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(true);

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
  
  const back=()=>{
    navigate(-1)
  }

  return (
    <div className="bg-indigo-100 px-8 min-h-screen">
      <button
        type="button"
        onClick={back}
        class="focus:outline-none float-right  text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
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
