import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Header() {
  const admin = Cookies.get("admin");
  console.log("Admin cookie value:", admin);

  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("admin");
    navigate("/login");
  };

  return (
    <header>
      <nav>
        <h4>{admin === "true" ? "Admin" : "User"}</h4>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
