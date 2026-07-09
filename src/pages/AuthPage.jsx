import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../css/auth.css";

function AuthPage() {

  const navigate = useNavigate();

  const [active, setActive] = useState(false);

  // LOGIN DATA

  const [loginData, setLoginData] = useState({

    email: "",

    password: "",

    adminId: ""

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

      let role = "student";

      if (loginData.adminId === "ADMIN123") {
        role = "admin";
      }

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: loginData.email,
          password: loginData.password,
          role
        }
      );

      alert(res.data.message);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      if (role === "admin") {

        navigate("/admin-dashboard");

      } else {

        navigate("/student-dashboard");

      }

    } catch (err) {

      alert("Login Failed");

    }

  };

  // REGISTER

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        registerData
      );

      alert(res.data.message);

      setActive(false);

    } catch (err) {

      alert("Register Failed");

    }

  };

  return (

    <div className={`container ${active ? "active" : ""}`}>

      {/* LOGIN */}

      <div className="form-box login">

        <form onSubmit={handleLogin}>

          <h1>Login</h1>

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
              type="text"
              placeholder="Enter Admin ID (Optional)"
              name="adminId"
              onChange={handleLoginChange}
            />

            <i className="fa-solid fa-id-badge"></i>

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

          <h1>Registration</h1>

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

          <h1>Hello, Welcome!</h1>

          <p>Don't have an account?</p>

          <button
            type="button"
            className="btn register-btn"
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
            className="btn login-btn"
            onClick={() => setActive(false)}
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default AuthPage;