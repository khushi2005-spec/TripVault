// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../services/api";

// function Register() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//     });
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//     const [loading, setloading] = useState(false);
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };
//     const handleSubmit = async (e) =>{
//         e.preventDefault();
//         setError("");
//         setSuccess("");
//         if(formData.password.length < 6){
//             setError("Password must be at least 6 characters");
//             return;
//         }
//         try {
//             setloading(true);
//             const response = await API.post(
//                 "/auth/register",
//                 formData
//             );
//             setSuccess(response.data.message);
//             setTimeout(() =>{
//                 navigate("/login");
//             }, 1200);
//         } catch (error) {
//             setError(
//                 error.response?.data?.message ||
//                 "Registration failed"
//             );
//         } finally {
//             setloading(false);
//         }
//     };
//     return (
//         <div className="auth-page">
//             <div className="auth-card">
//                 <div className="logo">
//                     TripVault
//         </div>
//         <h1>Create Account</h1>
//         <p className="subtitle">Start Saving Your Memories</p>
//         {error &&(
//             <div className="error">
//                 {error}
//             </div>
//         )}
//         {success && (
//             <div className="success">
//                 {success}
//             </div>
//         )}
//         <form onSubmit={handleSubmit}>
//             <label>Name</label>
//             <input
//             type="text"
//             name="name"
//             placeholder="Enter your name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             />
//             <label>Email</label>
//             <input 
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             />
//             <label>Password</label>
//             <input
//             type="password"
//             name="password"
//             placeholder="Minimum 6 Characters"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             minLength={6}
//             />
//             <button
//             type="submit"
//             disabled={loading}
//             >
//                 {loading
//                 ? "Creating Account..."
//                 : "Register"}
//             </button>
            
//         </form>
//         <p className="bottom-text">Already have an account?{" "}
//             <Link to="/login">Login</Link>
//         </p>
//         </div>
//         </div>
//     );
// }
// export default Register;
// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// function Register() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setMessage("");
//     setError("");

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         formData
//       );

//       setMessage(response.data.message);

//       // Go to login after successful registration
//       setTimeout(() => {
//         navigate("/login");
//       }, 1000);

//     } catch (error) {
//       setError(
//         error.response?.data?.message || "Registration failed"
//       );
//     }
//   };

//   return (
//     <div>
//       <h1>TripVault</h1>

//       <h2>Create Account</h2>

//       <form onSubmit={handleSubmit}>

//         <input
//           type="text"
//           name="name"
//           placeholder="Enter your name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         <br />
//         <br />

//         <input
//           type="email"
//           name="email"
//           placeholder="Enter your email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <br />
//         <br />

//         <input
//           type="password"
//           name="password"
//           placeholder="Enter your password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />

//         <br />
//         <br />

//         <button type="submit">
//           Register
//         </button>

//       </form>

//       {message && <p>{message}</p>}

//       {error && <p>{error}</p>}

//       <p>
//         Already have an account?{" "}
//         <Link to="/login">Login</Link>
//       </p>
//     </div>
//   );
// }

// export default Register;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await API.post(
        "/auth/register",
        formData
      );

      navigate("/login");
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Registration failed"
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
          Create your account and start saving memories.
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


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
              placeholder="Create a password"
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
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>


        <p className="auth-link">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;