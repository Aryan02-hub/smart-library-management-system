import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student"
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleRegister = async () => {

    try {

      const res = await axios.post(
        "https://smart-library-management-system.onrender.com/api/auth/register",
        formData
      );

      alert(res.data.message);

      navigate("/");

    } catch (err) {
      alert("Registration Failed");
    }

  };

  return (

    <div style={styles.container}>

      <div style={styles.box}>

        <h2>Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          style={styles.input}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          style={styles.input}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          style={styles.input}
          onChange={handleChange}
        />

        <select
          name="role"
          style={styles.input}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button style={styles.button} onClick={handleRegister}>
          Register
        </button>

        <p>
          Already have account? <Link to="/">Login</Link>
        </p>

      </div>

    </div>
  );
}

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#020617"
  },

  box: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px"
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#16a34a",
    color: "white",
    border: "none",
    cursor: "pointer"
  }

};

export default Register;