import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

// AUTH PAGES

import ChooseRole from "./pages/ChooseRole";
import StudentAuth from "./pages/StudentAuth";
import AdminAuth from "./pages/AdminAuth";

// DASHBOARDS

import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";

// PROFILE

import Profile from "./pages/Profile";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ROLE SELECTION */}

        <Route
          path="/"
          element={<ChooseRole />}
        />

        {/* STUDENT AUTH */}

        <Route
          path="/student-auth"
          element={<StudentAuth />}
        />

        {/* ADMIN AUTH */}

        <Route
          path="/admin-auth"
          element={<AdminAuth />}
        />

        {/* PROFILE */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* STUDENT DASHBOARD */}

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;