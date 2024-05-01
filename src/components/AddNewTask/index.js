import React, { useState } from "react";
import Cookies from "js-cookie";
import "./index.css";

function AddNewTask({ getUsersTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [assignedId, setAssignedId] = useState(null);
  const jwtToken = Cookies.get("jwt_token");
  const admin = Cookies.get("admin");

  const submitAddTaskForm = async (e) => {
    e.preventDefault();
    let userDetails;
    if (admin === "true") {
      userDetails = {
        title,
        description,
        status,
        assignedId,
      };
    } else {
      userDetails = {
        title,
        description,
        status,
      };
    }
    console.log(userDetails);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(
      `https://epimax-backend.onrender.com/tasks`,
      options
    );
    const textResponse = await response.text();
    console.log("Response:", textResponse);
    setTitle("");
    setDescription("");

    getUsersTasks();
  };

  return (
    <form className="add-new-task-container" onSubmit={submitAddTaskForm}>
      <div
        className="input-container"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <input
          type="textarea"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {admin === "true" && (
          <input
            type="number"
            placeholder="Assigned To"
            value={assignedId}
            onChange={(e) => setAssignedId(e.target.value)}
            style={{ marginBottom: "10px", marginTop: "10px", width: "100px" }}
          />
        )}
        <br />
        <select
          onChange={(e) => setStatus(e.target.value)}
          value={status}
          className="dropdown"
        >
          <option value="Pending">Pending</option>
          <option value="Progress">Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="add-task">
        Add
      </button>
    </form>
  );
}

export default AddNewTask;
