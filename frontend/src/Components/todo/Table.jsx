import axios from "axios";
import React, { useState } from "react";
import {
  MdDelete,
  MdEditNote,
  MdCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deletetodo,
  fetchTodo,
  updatetodo,
} from "../../features/todo/todoSlice";

// Correctly define props here
const Table = () => {
  const { todoList, error, status } = useSelector((state) => state.todo);

  const [editText, setEditText] = useState({
    body: "",
  });
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      dispatch(deletetodo(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id, value) => {
    dispatch(updatetodo(id, value));
  };

  const handleCheckbox = (id, completed) => {
    // Dispatch the thunk action, passing in the correct parameters
    dispatch(updatetodo({ id, value: { completed: !completed } }))
      .then((action) => {
        // This is where you can handle the resolved action
        console.log("Action resolved:", action);
        dispatch(fetchTodo());
      })
      .catch((error) => {
        // Handle any errors
        console.error("Failed to update todo:", error);
      });
  };

  const handeditonece = (id, data) => {
    dispatch(updatetodo({ id, value: { body: data } }))
      .then((action) => {
        console.log("Action resolved:", action);
        dispatch(fetchTodo());
      })
      .catch((error) => {
        console.error("Failed to update todo:", error);
      });
  };
  const handleChange = (e) => {
    setEditText((prev) => ({
      ...prev,
      body: e.target.value,
    }));
  };

  const handleclick = () => {
    handeditonece(editText.id, editText.body);
  };

  if (status == "loading") {
    // Return early if loading
    return <div>Loading...</div>;
  }

  return (
    <div className="py-2">
      <table className="w-11/12 max-w-4xl">
        <thead className="border-b-2 text-black border-black">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Checkbox
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              To Do
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              Status
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Date Created
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((todoList, index) => (
            <tr key={todoList.id} className="border-b border-black">
              {" "}
              {/* Add a unique key prop */}
              <td className="p-3 text-left" title={todoList.id}>
                <span
                  className="inline-block cursor-pointer text-gray-700"
                  onClick={(e) =>
                    handleCheckbox(todoList.id, todoList.completed)
                  }
                >
                  {todoList.completed ? (
                    <MdOutlineCheckBox />
                  ) : (
                    <MdCheckBoxOutlineBlank />
                  )}
                </span>
              </td>
              <td className="p-3 text-sm text-left text-gray-700">
                {todoList.body} {/* Example dynamic content */}
              </td>
              <td className="p-3 text-sm text-center">
                <span
                  className={`p-1.5 text-xs font-medium tracking-wider text-black rounded-md ${
                    todoList.completed ? "bg-green-300" : "bg-red-400"
                  }`}
                >
                  {todoList.completed ? "Done" : "Incomplete"}{" "}
                  {/* Example dynamic content */}
                </span>
              </td>
              <td className="p-3 text-sm text-left text-gray-700">
                {new Date(todoList.created).toLocaleString()}{" "}
                {/* Example dynamic content */}
              </td>
              <td className="p-3 text-sm font-medium grid grid-flow-col items-center gap-5 text-gray-800">
                <span
                  className="text-xl cursor-pointer"
                  onClick={() => handleDelete(todoList.id)}
                >
                  <MdDelete />
                </span>
                <span className="text-xl cursor-pointer">
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    <MdEditNote onClick={() => setEditText(todoList)} />
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Todo</h3>
            <input
              value={editText.body}
              onChange={handleChange}
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-primary mr-2" onClick={handleclick}>
                  Edit
                </button>
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </table>
    </div>
  );
};

export default Table;
