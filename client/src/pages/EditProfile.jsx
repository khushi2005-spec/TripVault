// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";
// import Navbar from "../components/Navbar";

// function EditProfile() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     bio: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   // Get current user information
//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await API.get("/auth/me");

//         const user = response.data.user;

//         setFormData({
//           username: user.username || "",
//           bio: user.bio || "",
//         });
//       } catch (error) {
//         console.error("Get User Error:", error);

//         setError(
//           error.response?.data?.message ||
//             "Failed to load profile"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUser();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Update profile
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setMessage("");

//     if (!formData.username.trim()) {
//       setError("Username is required");
//       return;
//     }

//     try {
//       setSaving(true);

//       const response = await API.put(
//         "/users/profile",
//         {
//           username: formData.username,
//           bio: formData.bio,
//         }
//       );

//       setMessage(response.data.message);

//       // Update stored user information if available
//       const storedUser = localStorage.getItem("user");

//       if (storedUser) {
//         const user = JSON.parse(storedUser);

//         user.username =
//           response.data.user.username;

//         user.bio =
//           response.data.user.bio;

//         localStorage.setItem(
//           "user",
//           JSON.stringify(user)
//         );
//       }

//       // Go to public profile after saving
//       setTimeout(() => {
//         navigate(
//           `/profile/${response.data.user.username}`
//         );
//       }, 1000);

//     } catch (error) {
//       console.error(
//         "Update Profile Error:",
//         error
//       );

//       setError(
//         error.response?.data?.message ||
//           "Failed to update profile"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Loading
//   if (loading) {
//     return (
//       <div className="loading">
//         Loading profile...
//       </div>
//     );
//   }

//   return (
//     <div className="profile-page">
//       <Navbar />

//       <main className="profile-container">

//         <div className="trip-form-header">
//           <p className="small-heading">
//             YOUR PROFILE
//           </p>

//           <h1>
//             Edit Profile
//           </h1>

//           <p>
//             Update your username and bio.
//           </p>
//         </div>

//         <div className="trip-form-card">

//           {error && (
//             <div className="error-message">
//               {error}
//             </div>
//           )}

//           {message && (
//             <div className="success-message">
//               {message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>

//             {/* Username */}
//             <div className="form-group">

//               <label>
//                 Username
//               </label>

//               <input
//                 type="text"
//                 name="username"
//                 placeholder="e.g. khushi"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//               />

//               <small>
//                 Your username will be used for
//                 your public profile.
//               </small>

//             </div>

//             {/* Bio */}
//             <div className="form-group">

//               <label>
//                 Bio
//               </label>

//               <textarea
//                 name="bio"
//                 placeholder="Tell people something about yourself..."
//                 value={formData.bio}
//                 onChange={handleChange}
//                 rows="5"
//               />

//             </div>

//             {/* Buttons */}
//             <div className="form-actions">

//               <button
//                 type="submit"
//                 className="primary-button"
//                 disabled={saving}
//               >
//                 {saving
//                   ? "Saving..."
//                   : "Save Profile"}
//               </button>

//               <button
//                 type="button"
//                 className="secondary-button"
//                 onClick={() =>
//                   navigate("/dashboard")
//                 }
//               >
//                 Cancel
//               </button>

//             </div>

//           </form>

//         </div>

//       </main>
//     </div>
//   );
// }

// export default EditProfile;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await API.get("/auth/me");
        const user = response.data.user;

        setFormData({
          username: user.username || "",
          bio: user.bio || "",
        });
      } catch (err) {
        console.error("Get User Error:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const username = formData.username.trim();

    if (!username) {
      setError("Username is required.");
      return;
    }

    try {
      setSaving(true);

      const response = await API.put("/users/profile", {
        username,
        bio: formData.bio.trim(),
      });

      setMessage(
        response.data.message || "Profile updated successfully."
      );

      const updatedUser = response.data.user;
      const storedUser = localStorage.getItem("user");

      if (storedUser && updatedUser) {
        const user = JSON.parse(storedUser);

        user.username = updatedUser.username;
        user.bio = updatedUser.bio;

        localStorage.setItem("user", JSON.stringify(user));
      }

      setTimeout(() => {
        navigate(`/profile/${encodeURIComponent(updatedUser.username)}`);
      }, 1000);
    } catch (err) {
      console.error("Update Profile Error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-profile-page">
        <Navbar />
        <main className="edit-profile-loading">
          <div className="edit-profile-spinner" />
          <p>Loading your profile...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="edit-profile-page">
      <Navbar />

      <main className="edit-profile-container">
        <div className="edit-profile-heading">
          <span className="edit-profile-kicker">
            YOUR TRAVEL IDENTITY
          </span>
          <h1>Edit your profile</h1>
          <p>
            Make your travel profile yours. Update your username
            and tell other travellers a little about yourself.
          </p>
        </div>

        <section className="edit-profile-card">
          <div className="edit-profile-card-header">
            <div className="edit-profile-avatar">
              {(formData.username || "U")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <h2>Profile details</h2>
              <p>Your public travel profile information</p>
            </div>
          </div>

          {error && (
            <div className="edit-profile-alert edit-profile-error" role="alert">
              {error}
            </div>
          )}

          {message && (
            <div className="edit-profile-alert edit-profile-success" role="status">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="edit-profile-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="e.g. khushi"
                value={formData.username}
                onChange={handleChange}
                maxLength={30}
                autoComplete="username"
                required
              />
              <small>
                Your username identifies your public profile.
              </small>
            </div>

            <div className="edit-profile-field">
              <label htmlFor="bio">About you</label>
              <textarea
                id="bio"
                name="bio"
                placeholder="I love discovering new places..."
                value={formData.bio}
                onChange={handleChange}
                rows={5}
                maxLength={300}
              />
              <div className="edit-profile-character-count">
                {formData.bio.length}/300 characters
              </div>
            </div>

            <div className="edit-profile-actions">
              <button
                type="submit"
                className="edit-profile-save"
                disabled={saving}
              >
                {saving ? "Saving changes..." : "Save changes"}
              </button>

              <button
                type="button"
                className="edit-profile-cancel"
                onClick={() => navigate("/dashboard")}
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>

        <p className="edit-profile-note">
          Your saved changes will appear on your public profile.
        </p>
      </main>
    </div>
  );
}

export default EditProfile;
