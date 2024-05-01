import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../src/components/Login";
import Register from "../src/components/Register";
import Home from "../src/components/Home";

export default function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
}
