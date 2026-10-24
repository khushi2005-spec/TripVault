import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import Navbar from "../components/Navbar";

function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyAction, setBusyAction] = useState("");

  // Fetch trip details
  const getTrip = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await API.get(`/trips/${id}`);
      const fetchedTrip = response.data.trip;

      if (!fetchedTrip) {
        setTrip(null);
        setError("Trip not found. It may have been deleted.");
        return;
      }

      setTrip(fetchedTrip);
    } catch (error) {
      console.error("Get Trip Error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to load trip. Please check your connection and try again.";

      setTrip(null);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getTrip();
  }, [getTrip]);

  // Update the displayed trip after a successful API action
  const updateTripFromResponse = (response) => {
    if (response.data.trip) {
      setTrip(response.data.trip);
    }
  };

  // Set a gallery photo as the cover image
  const handleSetCover = async (photo) => {
    setBusyAction("cover");

    try {
      const response = await API.patch(`/trips/${id}/cover`, {
        imageUrl: photo,
      });

      updateTripFromResponse(response);
      toast.success("Cover photo updated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update cover photo."
      );
    } finally {
      setBusyAction("");
    }
  };

  // Remove a photo from the gallery
  const handleRemovePhoto = async (photo) => {
    if (!window.confirm("Are you sure you want to remove this photo?")) {
      return;
    }

    setBusyAction("remove-photo");

    try {
      const response = await API.delete(`/trips/${id}/photos`, {
        data: { imageUrl: photo },
      });

      updateTripFromResponse(response);
      toast.success("Photo removed successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to remove photo."
      );
    } finally {
      setBusyAction("");
    }
  };

  // Remove the current cover image
  const handleRemoveCover = async () => {
    if (!trip?.coverImage) return;

    if (!window.confirm("Are you sure you want to remove the cover photo?")) {
      return;
    }

    setBusyAction("remove-cover");

    try {
      const response = await API.delete(`/trips/${id}/cover`);

      updateTripFromResponse(response);
      toast.success("Cover photo removed successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to remove cover photo."
      );
    } finally {
      setBusyAction("");
    }
  };

  // Replace an existing gallery photo with a new upload
  const handleReplacePhoto = async (oldPhoto, event) => {
    const file = event.target.files?.[0];

    // Allow the same file to be selected again later
    event.target.value = "";

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Choose a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must not exceed 5 MB.");
      return;
    }

    const formData = new FormData();
    formData.append("imageUrl", oldPhoto);
    formData.append("image", file);

    setBusyAction("replace-photo");

    try {
      const response = await API.put(`/trips/${id}/photos`, formData);

      updateTripFromResponse(response);
      toast.success("Photo replaced successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to replace photo."
      );
    } finally {
      setBusyAction("");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading" role="status" aria-live="polite">
        Loading trip...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="trip-detail-page">
        <Navbar />

        <main className="trip-detail-container">
          <div className="error-message" role="alert">
            {error}
          </div>

          <button
            className="secondary-button"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>

          <button
            className="secondary-button"
            onClick={getTrip}
            disabled={loading}
          >
            Try Again
          </button>
        </main>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="trip-detail-page">
        <Navbar />

        <main className="trip-detail-container">
          <p>Trip not found.</p>

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

  const photos = trip.photos || [];

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
              alt={trip.title || "Trip cover"}
              className="trip-detail-cover"
            />
          ) : (
            <div className="trip-detail-cover-placeholder">
              ✈️
            </div>
          )}

          <div className="trip-detail-info">
            <p className="small-heading">TRAVEL MEMORY</p>

            <h1>{trip.title}</h1>

            <p className="trip-destination">
              📍 {trip.destination}
            </p>

            <p>
              📅{" "}
              {trip.startDate
                ? new Date(trip.startDate).toLocaleDateString()
                : "N/A"}
              {" - "}
              {trip.endDate
                ? new Date(trip.endDate).toLocaleDateString()
                : "N/A"}
            </p>

            {trip.rating && (
              <p>⭐ Rating: {trip.rating}/5</p>
            )}

            {trip.description && (
              <p className="trip-description">
                {trip.description}
              </p>
            )}

            {trip.coverImage && (
              <button
                className="secondary-button"
                onClick={handleRemoveCover}
                disabled={Boolean(busyAction)}
              >
                {busyAction === "remove-cover"
                  ? "Removing..."
                  : "Remove Cover Photo"}
              </button>
            )}
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="photo-gallery-section">
          <div className="section-heading">
            <p className="small-heading">TRIP PHOTOS</p>
            <h2>Photo Memories</h2>
          </div>

          {photos.length > 0 ? (
            <div className="photo-grid">
              {photos.map((photo, index) => {
                const isCover = trip.coverImage === photo;

                return (
                  <div
                    className="photo-grid-item"
                    key={`${photo}-${index}`}
                  >
                    <img
                      src={photo}
                      alt={`${trip.title || "Trip"} photo ${index + 1}`}
                      loading="lazy"
                    />

                    <div className="photo-management-actions">
                      {isCover && (
                        <p className="photo-cover-label">
                          Current Cover
                        </p>
                      )}

                      {!isCover && (
                        <button
                          className="secondary-button"
                          onClick={() => handleSetCover(photo)}
                          disabled={Boolean(busyAction)}
                        >
                          Set as Cover
                        </button>
                      )}

                      <label className="secondary-button photo-upload-label">
                        Replace Photo
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          disabled={Boolean(busyAction)}
                          onChange={(event) =>
                            handleReplacePhoto(photo, event)
                          }
                        />
                      </label>

                      <button
                        className="secondary-button"
                        onClick={() => handleRemovePhoto(photo)}
                        disabled={Boolean(busyAction)}
                      >
                        Remove Photo
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-photo-state">
              <div>📷</div>
              <h3>No photos yet</h3>

              <p>
                Upload photos to create memories from this trip.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default TripDetail;
