// AllTasks.js
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import "./index.css";

function AllTasks({ onDeleteTask }) {
  const [allTask, setAllTask] = useState([]);
  const jwtToken = Cookies.get("jwt_token");

  useEffect(() => {
    async function getAllTasks() {
      const options = {
        method: "GET",
        headers: {
          authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(
        "https://epimax-backend.onrender.com/tasks",
        options
      );
      const result = await response.json();
      setAllTask(result);
    }
    getAllTasks();
  }, [jwtToken, onDeleteTask]);

  const handleDeleteTask = async (taskId) => {
    await onDeleteTask(taskId);
  };

  return (
    <div className="all-tasks-container">
      <h1>ALL TASKS ( Admin Only )</h1>
      <div className="table-container">

      {allTask.length !== 0 && (
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allTask.map((task, i) => (
              <tr key={i}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>
                  <button onClick={() => {}} className="table-button">
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="table-button"
                    >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {allTask.length===0 && <p className="no-task">Add New Tasks</p>}
          </tbody>
        </table>
      )}
      </div>
    </div>
  );
}

export default AllTasks;
