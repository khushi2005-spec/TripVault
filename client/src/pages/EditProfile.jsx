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
