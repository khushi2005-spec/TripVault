// import { useState } from "react";
// import {Link, useNavigate } from "react-router-dom";
// import API from "../services/api";

// function Login() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });
//     const [error, setError] = useState("");
//     const [loading, setloading] = useState(false);
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };
//     const handleSubmit = async(e) => {
//         e.preventDefault();
//         setError("");
//             try {
//                 setloading(true);
//                 const response = await API.post(
//                     "/auth/login",
//                     formData
//                 );
//                 const { token, user } = response.data;
//                 localStorage.setItem("token", token);
//                 localStorage.setItem(
//                     "user",
//                     JSON.stringify(user)
//                 );
//                 navigate("/dashboard");
//             } catch (error) {
//                 setError(
//                     error.response?.data?.message ||
//                     "Login failed"
//                 );
//             } finally {
//                 setloading(false);
//             }
//     };
//         return (
//             <div className="auth-page">
//                 <div className="auth-card">
//                     <div className="logo">
//                         TripVault
//                     </div>
//                     <h1>Welcome Back</h1>
//                     <p className="subtitle">Login to continue your journey</p>
//                     {error && (
//                         <div className="error">
//                             {error}
//                             </div>
//                     )}
//                     <form onSubmit={handleSubmit}>
//                         <label>Email</label>
//                         <input
//                         type="email"
//                         name="email"
//                         placeholder="Enter your email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         />
//                         <label>Password</label>
//                         <input
//                         type="password"
//                         name="password"
//                         placeholder="Enter your password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                         />
//                         <button
//                         type="submit"
//                         disabled={loading}
//                         >
//                             {loading
//                             ? "Logging in..."
//                             : "Login"}
//                         </button>
//                     </form>
//                     <p className="bottom-text">Don't have an account?{" "}
//                         <Link to="/register">Create Account</Link>
//                     </p>
//                 </div>
//             </div>
//         );
//     }
// export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="logo">
          Trip<span>Vault</span>
        </div>

        <p className="auth-subtitle">
          Welcome back! Continue your journey.
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>


          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>


        <p className="auth-link">
          Don't have an account?{" "}
          <Link to="/register">
            Create one
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;