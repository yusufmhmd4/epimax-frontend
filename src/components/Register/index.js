import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const userDetails = {
      name,
      username,
      password,
      isAdmin,
    };
    console.log(userDetails);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(
      `https://epimax-backend.onrender.com/register`,
      options
    );
    console.log(response);
    if (response.ok) {
      const result = await response.text();
      navigate("/login");
      console.log(result);
    } else {
      const result = await response.text();
      setIsError(true);
      setErrorMsg(result);
      console.log(result);
    }
  };

  return (
    <div className="app-container">
      <h1 className="login-heading">Register App</h1>
      <form onSubmit={(e) => onSubmitForm(e)} className="form-container">
        <div className="input-container">
          <label htmlFor="name">NAME</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            value={isAdmin}
            onChange={(e) => setIsAdmin(!isAdmin)}
          />
          <label htmlFor="checkbox">Admin</label>
        </div>
        {isError && <p className="error-msg">*{errorMsg}</p>}
        <button type="submit" className="submit-button">
          Register Now
        </button>
      </form>
      <p className="link-el" style={{ fontSize: "14px", fontFamily: "Roboto" }}>
        Already have an account?{" "}
        <Link to="/login" className="link">
          Login Now
        </Link>
      </p>
    </div>
  );
}

export default Register;
