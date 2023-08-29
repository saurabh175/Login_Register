import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [err, setError] = useState("");
  const HandelInputData = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const HandelSubmit = async(e) => {
    e.preventDefault();
    try {
      const { data: res } =  await axios.post("http://localhost:8080/api/auth", data);
      localStorage.setItem("token", res.data);
      window.location = "/";
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
      <div className="Main">
        <div className="left">
          <form className="Card">
            <h1>Login to your account</h1>
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
            {err && (
              <div style={{ color: "red", font: "25px", textAlign: "center", height:"5vh",width:"100%"}}>
                {err}
              </div>
            )}
            <button className="Button" onClick={HandelSubmit}>
              Login
            </button>
          </form>
        </div>
        <div className="right">
          <h1>New Here?</h1>
          <button className="Button">
            <Link style={{ textDecoration: "none" }} to="/register">
              Register
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};
