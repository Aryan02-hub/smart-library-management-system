import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {

    if (
      storedUser &&
      storedUser !== "undefined"
    ) {
      user = JSON.parse(storedUser);
    }

  } catch (err) {

    console.log("Invalid User Data");

    localStorage.removeItem("user");

  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;