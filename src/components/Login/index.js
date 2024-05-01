import React, { useState } from "react";
import Cookies from "js-cookie";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const userDetails = {
      username,
      password,
      isAdmin,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(
      `https://epimax-backend.onrender.com/login`,
      options
    );

    if (response.ok) {
      const result = await response.json();
      Cookies.set("jwt_token", result.jwtToken, { expires: 2 });
      Cookies.set("admin", Boolean(result.isAdmin), { expires: 3 });
      navigate("/"); // Redirect to home page
    } else {
      const result = await response.text();
      setIsError(true);
      setErrorMsg(result);
    }
  };

  return (
    <div className="app-container">
      <h1 className="login-heading">Login App</h1>
      <form onSubmit={(e) => onSubmitForm(e)} className="form-container">
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
          Login Now
        </button>
      </form>
      <p className="link-el" style={{ fontSize: "14px", fontFamily: "Roboto" }}>
        Don't have an account?{" "}
        <Link to="/register" className="link">
          Register Now
        </Link>
      </p>
    </div>
  );
}

export default Login;
