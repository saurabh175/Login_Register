import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

export const Register = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState("");
  const [msg, setMsg] = useState("");
  const HandelInputData = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const HandelSubmit = async(e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post("http://localhost:8080/api/users", data);
      setMsg(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <>
      <div className="rMain">
        <div className="rleft">
          <h1>Welcome Back</h1>
          <button className="Button">
            <Link style={{ textDecoration: "none" }} to="/login">
              Login
            </Link>
          </button>
        </div>
        <div className="rright">
          <form className="Card">
            <h1>Create Account</h1>
            <input
              type="text"
              className="input"
              placeholder="First Name"
              name="firstname"
              value={data.firstname}
              onChange={HandelInputData}
              required
            ></input>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              name="lastname"
              value={data.lastname}
              onChange={HandelInputData}
              required
            ></input>
            <input
              type="email"
              className="input"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={HandelInputData}
              required
            ></input>
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={HandelInputData}
              required
            ></input>
         
            {msg&&<div style={{color:"red",font:"25px",textAlign:"center",height:"5vh",width:"100%"}} >{msg}</div>}
            {err&&<div style={{color:"red",font:"25px",textAlign:"center"}} >{err}</div>}
            <button className="Button" onClick={HandelSubmit}>
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
