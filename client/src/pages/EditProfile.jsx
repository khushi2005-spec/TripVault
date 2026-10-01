import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

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

  // Get current user information
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await API.get("/auth/me");

        const user = response.data.user;

        setFormData({
          username: user.username || "",
          bio: user.bio || "",
        });
      } catch (error) {
        console.error("Get User Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!formData.username.trim()) {
      setError("Username is required");
      return;
    }

    try {
      setSaving(true);

      const response = await API.put(
        "/users/profile",
        {
          username: formData.username,
          bio: formData.bio,
        }
      );

      setMessage(response.data.message);

      // Update stored user information if available
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        user.username =
          response.data.user.username;

        user.bio =
          response.data.user.bio;

        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );
      }

      // Go to public profile after saving
      setTimeout(() => {
        navigate(
          `/profile/${response.data.user.username}`
        );
      }, 1000);

    } catch (error) {
      console.error(
        "Update Profile Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="loading">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-container">

        <div className="trip-form-header">
          <p className="small-heading">
            YOUR PROFILE
          </p>

          <h1>
            Edit Profile
          </h1>

          <p>
            Update your username and bio.
          </p>
        </div>

        <div className="trip-form-card">

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Username */}
            <div className="form-group">

              <label>
                Username
              </label>

              <input
                type="text"
                name="username"
                placeholder="e.g. khushi"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <small>
                Your username will be used for
                your public profile.
              </small>

            </div>

            {/* Bio */}
            <div className="form-group">

              <label>
                Bio
              </label>

              <textarea
                name="bio"
                placeholder="Tell people something about yourself..."
                value={formData.bio}
                onChange={handleChange}
                rows="5"
              />

            </div>

            {/* Buttons */}
            <div className="form-actions">

              <button
                type="submit"
                className="primary-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Profile"}
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  navigate("/dashboard")
                }
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </main>
    </div>
  );
}

export default EditProfile;