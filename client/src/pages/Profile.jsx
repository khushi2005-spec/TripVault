import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Profile() {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await API.get(
          `/users/${username}/profile`
        );

        setProfile(response.data.profile);
      } catch (error) {
        console.error("Profile Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="loading">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <Navbar />

        <main className="profile-container">
          <div className="error-message">
            {error}
          </div>
        </main>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-container">

        {/* Profile Header */}
        <section className="profile-header">

          <div className="profile-avatar">
            {profile.name
              ? profile.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div className="profile-info">

            <p className="small-heading">
              TRAVEL PROFILE
            </p>

            <h1>
              {profile.name}
            </h1>

            <p className="profile-username">
              @{profile.username}
            </p>

            {profile.bio && (
              <p className="profile-bio">
                {profile.bio}
              </p>
            )}

          </div>

        </section>

        {/* Trips */}
        <section className="profile-trips">

          <div className="section-heading">

            <p className="small-heading">
              TRAVEL MEMORIES
            </p>

            <h2>
              {profile.name}'s Trips
            </h2>

          </div>

          {profile.trips &&
          profile.trips.length > 0 ? (
            <div className="profile-trip-grid">

              {profile.trips.map((trip) => (

                <div
                  className="profile-trip-card"
                  key={trip._id}
                >

                  {/* Cover Image */}
                  {trip.coverImage ? (
                    <img
                      src={trip.coverImage}
                      alt={trip.title}
                      className="profile-trip-image"
                    />
                  ) : (
                    <div className="profile-trip-placeholder">
                      ✈️
                    </div>
                  )}

                  <div className="profile-trip-content">

                    <h3>
                      {trip.title}
                    </h3>

                    <p>
                      📍 {trip.destination}
                    </p>

                    <p>
                      📅{" "}
                      {trip.startDate
                        ? new Date(
                            trip.startDate
                          ).toLocaleDateString()
                        : "N/A"}
                      {" - "}
                      {trip.endDate
                        ? new Date(
                            trip.endDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>

                    {trip.rating && (
                      <p>
                        ⭐ {trip.rating}/5
                      </p>
                    )}

                  </div>

                </div>

              ))}

            </div>
          ) : (
            <div className="empty-photo-state">

              <div>✈️</div>

              <h3>
                No trips yet
              </h3>

              <p>
                This traveler hasn't added any
                trips yet.
              </p>

            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default Profile;