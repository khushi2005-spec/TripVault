import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Page imports
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import EditTrip from "./pages/EditTrip";
import TripDetail from "./pages/TripDetail";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

// Component imports
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect the home page to login */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Authentication routes */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Public profile route */}
        <Route
          path="/profile/:username"
          element={<Profile />}
        />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/create-trip"
            element={<CreateTrip />}
          />

          <Route
            path="/edit-trip/:id"
            element={<EditTrip />}
          />

          <Route
            path="/trip/:id"
            element={<TripDetail />}
          />

          <Route
            path="/edit-profile"
            element={<EditProfile />}
          />
        </Route>

        {/* Redirect unknown routes to login */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>

      {/* Footer */}
      <Footer />

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;