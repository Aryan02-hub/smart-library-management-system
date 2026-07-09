import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../css/studentAuth.css";

function StudentAuth() {

  const navigate = useNavigate();

  const [active, setActive] = useState(false);

  // LOGIN DATA

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // REGISTER DATA

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student"
  });

  // HANDLE LOGIN INPUT

  const handleLoginChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });

  };

  // HANDLE REGISTER INPUT

  const handleRegisterChange = (e) => {

    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });

  };

  // LOGIN

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://smart-library-management-system-h695.onrender.com/api/auth/login",
        {
          ...loginData,
          role: "student"
        }
      );

      alert(res.data.message);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/student-dashboard");

    } catch (err) {

      alert("Login Failed");

    }

  };

  // REGISTER

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://smart-library-management-system-h695.onrender.com/api/auth/register",
        registerData
      );

      alert(res.data.message);

      setActive(false);

    } catch (err) {

      alert("Register Failed");

    }

  };

  return (

    <div className={`student-container ${active ? "active" : ""}`}>

      {/* LOGIN */}

      <div className="form-box login">

        <form onSubmit={handleLogin}>

          <h1>Student Login</h1>

          <div className="input-box">

            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              required
              onChange={handleLoginChange}
            />

            <i className="fa-solid fa-envelope"></i>

          </div>

          <div className="input-box">

            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              onChange={handleLoginChange}
            />

            <i className="fa-solid fa-lock"></i>

          </div>

          <button
            type="submit"
            className="btn"
          >
            Login
          </button>

        </form>

      </div>

      {/* REGISTER */}

      <div className="form-box register">

        <form onSubmit={handleRegister}>

          <h1>Student Register</h1>

          <div className="input-box">

            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              required
              onChange={handleRegisterChange}
            />

            <i className="fa-solid fa-user"></i>

          </div>

          <div className="input-box">

            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              required
              onChange={handleRegisterChange}
            />

            <i className="fa-solid fa-envelope"></i>

          </div>

          <div className="input-box">

            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              onChange={handleRegisterChange}
            />

            <i className="fa-solid fa-lock"></i>

          </div>

          <button
            type="submit"
            className="btn"
          >
            Register
          </button>

        </form>

      </div>

      {/* TOGGLE */}

      <div className="toggle-box">

        <div className="toggle-panel toggle-left">

          <h1>Hello Student!</h1>

          <p>Don't have an account?</p>

          <button
            type="button"
            className="btn"
            onClick={() => setActive(true)}
          >
            Register
          </button>

        </div>

        <div className="toggle-panel toggle-right">

          <h1>Welcome Back!</h1>

          <p>Already have an account?</p>

          <button
            type="button"
            className="btn"
            onClick={() => setActive(false)}
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default StudentAuth;