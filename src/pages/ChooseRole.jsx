import { useNavigate } from "react-router-dom";

import "../css/chooseRole.css";

import saraswati from "../assets/saraswati.png";

function ChooseRole() {

  const navigate = useNavigate();

  return (

    <div className="role-container">

      {/* LEFT SECTION */}

      <div className="left-section">

        <img
          src={saraswati}
          alt="Maa Saraswati"
          className="saraswati-img"
        />

      </div>

      {/* RIGHT SECTION */}

      <div className="right-section">

        <div className="role-box">

          <h1>Smart Library</h1>

          <h3 className="shlok">

            या कुन्देन्दु तुषारहार धवला,<br />
            या शुभ्रवस्त्रावृता।<br />
            या वीणावरदण्डमण्डितकरा,<br />
            या श्वेतपद्मासना॥

          </h3>

          <p className="description">

            A modern digital library platform
            designed to simplify book management,
            issue tracking, student access,
            and smart learning experiences.

          </p>

          <div className="role-buttons">

            <button
              className="student-btn"
              onClick={() => navigate("/student-auth")}
            >
              Login as Student
            </button>

            <button
              className="admin-btn"
              onClick={() => navigate("/admin-auth")}
            >
              Login as Admin
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ChooseRole;