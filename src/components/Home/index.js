import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllTasks from "../AllTasks";
import Header from "../Header";
import "./index.css";
import AddNewTask from "../AddNewTask";

export default function Home() {
  const [taskList, setTaskList] = useState([]);
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwt_token");
  const admin = Cookies.get("admin");

  useEffect(() => {
    console.log("Effect");
    if (jwtToken) {
      getUsersTasks();
    } else {
      navigate("/login");
    }
  }, []);

  async function getUsersTasks() {
    console.log("called");
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fetch(
        `https://epimax-backend.onrender.com/users/tasks`,
        options
      );
      const result = await response.json();
      setTaskList(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  const onDeleteTask = async (taskId) => {
    const options = {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(
      `https://epimax-backend.onrender.com/tasks/${taskId}`,
      options
    );
    if (response.ok) {
      // If delete operation is successful, update taskList state
      getUsersTasks();
    } else {
      console.error("Error deleting task");
    }
  };

  return (
    <div className="home-container">
      <Header />
      <AddNewTask getUsersTasks={getUsersTasks} />
      {admin === "true" && <AllTasks onDeleteTask={onDeleteTask} />}
      <h1 className="task-heading">TASKS</h1>
      {taskList.length !== 0 && (
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
            {taskList.map((task, i) => (
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
                    onClick={() => {
                      onDeleteTask(task.id);
                    }}
                    className="table-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {taskList.length===0 && <p className="no-task">Add New Tasks</p>}
    </div>
  );
}
