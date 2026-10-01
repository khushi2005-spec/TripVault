import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getTrip = async () => {
      try {
        const response = await API.get(`/trips/${id}`);
        setTrip(response.data.trip);
      } catch (error) {
        console.error("Get Trip Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load trip"
        );
      } finally {
        setLoading(false);
      }
    };

    getTrip();
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        Loading trip...
      </div>
    );
  }

  if (error) {
    return (
      <div className="trip-detail-page">
        <Navbar />

        <main className="trip-detail-container">
          <div className="error-message">
            {error}
          </div>

          <button
            className="secondary-button"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </main>
      </div>
    );
  }

  if (!trip) {
    return null;
  }

  return (
    <div className="trip-detail-page">
      <Navbar />

      <main className="trip-detail-container">

        {/* Back Button */}
        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        {/* Trip Header */}
        <section className="trip-detail-header">

          {trip.coverImage ? (
            <img
              src={trip.coverImage}
              alt={trip.title}
              className="trip-detail-cover"
            />
          ) : (
            <div className="trip-detail-cover-placeholder">
              ✈️
            </div>
          )}

          <div className="trip-detail-info">
            <p className="small-heading">
              TRAVEL MEMORY
            </p>

            <h1>{trip.title}</h1>

            <p className="trip-destination">
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
                ⭐ Rating: {trip.rating}/5
              </p>
            )}

            {trip.description && (
              <p className="trip-description">
                {trip.description}
              </p>
            )}
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="photo-gallery-section">

          <div className="section-heading">
            <p className="small-heading">
              TRIP PHOTOS
            </p>

            <h2>Photo Memories</h2>
          </div>

          {trip.photos && trip.photos.length > 0 ? (
            <div className="photo-grid">

              {trip.photos.map((photo, index) => (
                <div
                  className="photo-grid-item"
                  key={index}
                >
                  <img
                    src={photo}
                    alt={`${trip.title} ${index + 1}`}
                  />
                </div>
              ))}

            </div>
          ) : (
            <div className="empty-photo-state">
              <div>📷</div>

              <h3>No photos yet</h3>

              <p>
                Upload photos to create memories
                from this trip.
              </p>
            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default TripDetail;