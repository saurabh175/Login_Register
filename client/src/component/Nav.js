import React from "react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import "./Nav.css";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import { Emailverify } from "./Emailverify/Emailverify";
export const Nav = () => {
  return (
    <>
      <Router>
        <nav className="header">
          <ul>
            <li>
              <Link style={{color: "white", textDecoration:"none"}} to="/"> Home</Link>
            </li>
            <li>
              <Link style={{color: "white" , textDecoration:"none"}} to="/login">Login</Link>
            </li>
            <li>
              <Link  style={{color: "white" , textDecoration:"none"}} to="/register">Register</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/users/:id/verify/:token" element={<Emailverify />} />
        </Routes>
      </Router>   
    </>
  );
};
