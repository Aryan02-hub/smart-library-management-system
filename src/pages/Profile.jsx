import { useState } from "react";
import axios from "axios";

function Profile() {

  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData, setFormData] = useState({

    username: storedUser.username || "",

    mobile: storedUser.mobile || "",

    photo: storedUser.photo || "",

    email: storedUser.email

  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const updateProfile = async () => {

    try {

      const res = await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        formData
      );

      alert(res.data.message);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

    } catch (err) {

      alert("Update Failed");

    }

  };

  return (

    <div style={styles.container}>

      <div style={styles.box}>

        <h2>My Profile</h2>

        {
          formData.photo && (

            <img
              src={formData.photo}
              alt="profile"
              style={styles.image}
            />

          )
        }

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={formData.photo}
          onChange={handleChange}
          style={styles.input}
        />

        <button
          style={styles.button}
          onClick={updateProfile}
        >
          Update Profile
        </button>

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
    background: "#f1f5f9"
  },

  box: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "350px",
    textAlign: "center"
  },

  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer"
  }

};

export default Profile;