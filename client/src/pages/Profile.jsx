import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./Profile.css";

function Profile() {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const getProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await API.get(
          `/users/${encodeURIComponent(username)}/profile`
        );

        if (active) {
          setProfile(response.data.profile);
        }
      } catch (err) {
        console.error("Profile Error:", err);

        if (active) {
          setError(
            err.response?.data?.message ||
              "Unable to load this travel profile."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    if (username) {
      getProfile();
    } else {
      setError("A username is required to view this profile.");
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [username]);

  if (loading) {
    return (
      <div className="profile-page">
        <Navbar />
        <main className="profile-container profile-state">
          <div className="profile-spinner" />
          <p>Loading travel memories...</p>
        </main>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="profile-page">
        <Navbar />
        <main className="profile-container profile-state">
          <div className="profile-state-icon">✈</div>
          <h1>Profile unavailable</h1>
          <p>{error || "This profile could not be found."}</p>
        </main>
      </div>
    );
  }

  const trips = Array.isArray(profile.trips)
    ? profile.trips
    : [];

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-container">
        <section className="profile-cover">
          <div className="profile-cover-decoration">✦</div>

          <div className="profile-identity">
            <div className="profile-avatar">
              {(profile.name || profile.username || "U")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="profile-info">
              <p className="profile-eyebrow">
                <span className="profile-status-dot" />
                TRAVEL JOURNAL
              </p>

              <h1>{profile.name || profile.username}</h1>

              <p className="profile-username">
                @{profile.username}
              </p>

              <p className="profile-bio">
                {profile.bio ||
                  "Collecting places, stories, and memories along the way."}
              </p>
            </div>
          </div>

          <div className="profile-travel-badge">
            <span>✈</span>
            <span>Every trip tells a story</span>
          </div>
        </section>

        <section className="profile-trips">
          <div className="profile-section-heading">
            <div>
              <p className="profile-eyebrow">THE JOURNEY SO FAR</p>
              <h2>Travel memories</h2>
              <p className="profile-section-subtitle">
                A collection of places and moments worth remembering.
              </p>
            </div>

            <div className="profile-trip-count">
              <span>{trips.length}</span>
              <span>{trips.length === 1 ? "trip" : "trips"}</span>
            </div>
          </div>

          {trips.length > 0 ? (
            <div className="profile-trip-grid">
              {trips.map((trip) => (
                <article
                  className="profile-trip-card"
                  key={trip._id}
                >
                  <div className="profile-trip-media">
                    {trip.coverImage ? (
                      <img
                        src={trip.coverImage}
                        alt={`Memories from ${trip.title}`}
                        className="profile-trip-image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="profile-trip-placeholder">
                        <span>✈</span>
                        <span>Travel memory</span>
                      </div>
                    )}

                    {trip.rating && (
                      <span className="profile-trip-rating">
                        ★ {trip.rating}/5
                      </span>
                    )}
                  </div>

                  <div className="profile-trip-content">
                    <p className="profile-trip-destination">
                      <span>⌖</span>
                      {trip.destination}
                    </p>

                    <h3>{trip.title}</h3>

                    <p className="profile-trip-dates">
                      {trip.startDate
                        ? new Date(
                            trip.startDate
                          ).toLocaleDateString(undefined, {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Date not set"}
                      {" — "}
                      {trip.endDate
                        ? new Date(
                            trip.endDate
                          ).toLocaleDateString(undefined, {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Date not set"}
                    </p>

                    {trip.description && (
                      <p className="profile-trip-description">
                        {trip.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="profile-empty-state">
              <div className="profile-empty-icon">✈</div>
              <h3>The journey starts here</h3>
              <p>
                No travel memories have been shared on this profile yet.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Profile;