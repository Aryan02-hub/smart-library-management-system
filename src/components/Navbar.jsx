import { useNavigate } from "react-router-dom";

function Navbar({ title }) {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // LOGOUT

  const logout = () => {

    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <div style={styles.navbar}>

      {/* LEFT */}

      <div>

        <h2 style={styles.title}>
          {title}
        </h2>

      </div>

      {/* RIGHT */}

      <div style={styles.right}>

        <div style={styles.userBox}>

          <div style={styles.avatar}>
            {
              user?.username?.charAt(0).toUpperCase()
            }
          </div>

          <span style={styles.username}>
            {user?.username}
          </span>

        </div>

        <button
          style={styles.logoutBtn}
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

const styles = {

  navbar: {
    width: "100%",
    height: "75px",
    background: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    borderRadius: "18px",
    boxShadow: "0 0 10px rgba(0,0,0,0.08)",
    marginBottom: "25px"
  },

  title: {
    color: "#0f172a",
    fontSize: "28px",
    fontWeight: "700"
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "18px"
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontWeight: "700",
    fontSize: "18px"
  },

  username: {
    fontWeight: "600",
    color: "#334155"
  },

  logoutBtn: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "10px",
    background: "#ef4444",
    color: "white",
    fontWeight: "600",
    cursor: "pointer"
  }

};

export default Navbar;