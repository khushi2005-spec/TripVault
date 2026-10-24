import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import Navbar from "../components/Navbar";

function EditTrip() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    rating: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState("");
  const [message, setMessage] = useState("");

  // Load the existing trip.
  const getTrip = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const response = await API.get(`/trips/${id}`);
      const trip = response.data?.trip || response.data;

      if (!trip || !trip._id) {
        throw new Error("Trip not found. It may have been deleted.");
      }

      setFormData({
        title: trip.title || "",
        destination: trip.destination || "",
        startDate: trip.startDate
          ? trip.startDate.substring(0, 10)
          : "",
        endDate: trip.endDate
          ? trip.endDate.substring(0, 10)
          : "",
        description: trip.description || "",
        rating:
          trip.rating !== undefined && trip.rating !== null
            ? String(trip.rating)
            : "",
      });

      setPreview(trip.coverImage || "");
      setSelectedFile(null);
      setError("");
    } catch (err) {
      console.error("Get Trip Error:", err);

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to load trip. Please try again.";

      setLoadError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getTrip();
  }, [getTrip]);

  // Release temporary preview URLs when replaced or unmounted.
  useEffect(() => {
    if (!selectedFile) return undefined;

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  // Handle form inputs.
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  // Validate and select a replacement photo.
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      const errorMessage =
        "Please select a JPG, PNG, or WEBP image.";

      setError(errorMessage);
      toast.error(errorMessage);
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      const errorMessage =
        "Image size must not exceed 5 MB.";

      setError(errorMessage);
      toast.error(errorMessage);
      e.target.value = "";
      return;
    }

    setError("");
    setMessage("");
    setSelectedFile(file);
  };

  // Upload a replacement photo.
  const uploadPhoto = async () => {
    if (!selectedFile) return true;

    setUploading(true);

    try {
      const imageData = new FormData();
      imageData.append("image", selectedFile);

      await API.post(`/trips/${id}/upload`, imageData);

      return true;
    } catch (err) {
      console.error(
        "Photo Upload Error:",
        err.response?.data || err
      );

      const errorMessage =
        err.response?.data?.message ||
        "Failed to upload photo. Please try again.";

      setError(errorMessage);
      toast.error(errorMessage);

      return false;
    } finally {
      setUploading(false);
    }
  };

  // Save trip details and then upload a replacement photo.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    setError("");
    setMessage("");

    const title = formData.title.trim();
    const destination = formData.destination.trim();

    if (!title || !destination) {
      const errorMessage =
        "Trip title and destination are required.";

      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.endDate < formData.startDate
    ) {
      const errorMessage =
        "End date cannot be earlier than start date.";

      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setSaving(true);

    let tripDetailsSaved = false;

    try {
      const dataToSend = {
        title,
        destination,
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.description.trim(),
        ...(formData.rating
          ? { rating: Number(formData.rating) }
          : {}),
      };

      const response = await API.put(
        `/trips/${id}`,
        dataToSend
      );

      tripDetailsSaved = true;

      if (selectedFile) {
        const uploadSuccess = await uploadPhoto();

        if (!uploadSuccess) {
          setMessage(
            "Trip details were saved, but the photo was not updated. You can retry the photo upload."
          );
          return;
        }
      }

      const successMessage =
        response.data?.message ||
        (selectedFile
          ? "Trip and photo updated successfully!"
          : "Trip updated successfully!");

      setMessage(successMessage);
      toast.success(successMessage);

      navigate("/dashboard");
    } catch (err) {
      console.error(
        "Update Trip Error:",
        err.response?.data || err
      );

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to update trip. Please try again.";

      setError(
        tripDetailsSaved
          ? `Trip details were saved, but another operation failed. ${errorMessage}`
          : errorMessage
      );

      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  // Loading state.
  if (loading) {
    return (
      <div className="trip-form-page">
        <Navbar />
        <main className="trip-form-container">
          <div className="loading" role="status" aria-live="polite">
            Loading trip...
          </div>
        </main>
      </div>
    );
  }

  // Load error with retry.
  if (loadError) {
    return (
      <div className="trip-form-page">
        <Navbar />

        <main className="trip-form-container">
          <div className="trip-form-card">
            <div className="error-message" role="alert">
              {loadError}
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="primary-button"
                onClick={getTrip}
              >
                Try Again
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="trip-form-page">
      <Navbar />

      <main className="trip-form-container">
        <div className="trip-form-header">
          <p className="small-heading">UPDATE MEMORY</p>
          <h1>Edit Your Trip</h1>
          <p>Update your trip details and add another memory.</p>
        </div>

        <div className="trip-form-card">
          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          {message && (
            <div className="success-message" role="status">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Trip Title</label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="e.g. My Goa Adventure"
                value={formData.title}
                onChange={handleChange}
                maxLength={100}
                required
                disabled={saving}
              />
            </div>

            <div className="form-group">
              <label htmlFor="destination">Destination</label>
              <input
                id="destination"
                type="text"
                name="destination"
                placeholder="e.g. Goa, India"
                value={formData.destination}
                onChange={handleChange}
                maxLength={150}
                required
                disabled={saving}
              />
            </div>

            <div className="date-row">
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  id="startDate"
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  max={formData.endDate || undefined}
                  required
                  disabled={saving}
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  id="endDate"
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate || undefined}
                  required
                  disabled={saving}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Write something about your trip..."
                value={formData.description}
                onChange={handleChange}
                maxLength={2000}
                disabled={saving}
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <select
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                disabled={saving}
              >
                <option value="">Select Rating</option>
                <option value="1">⭐ 1</option>
                <option value="2">⭐⭐ 2</option>
                <option value="3">⭐⭐⭐ 3</option>
                <option value="4">⭐⭐⭐⭐ 4</option>
                <option value="5">⭐⭐⭐⭐⭐ 5</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="image">Replace Trip Cover Photo</label>
              <input
                id="image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={saving}
              />

              <small>
                Optional. JPG, PNG, or WEBP; maximum size 5 MB.
                Leave empty to keep the current photo.
              </small>
            </div>

            {preview && (
              <div className="image-preview-container">
                <p className="small-heading">PHOTO PREVIEW</p>

                <img
                  src={preview}
                  alt="Trip cover preview"
                  className="image-preview"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

                {selectedFile && (
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview("");
                      const input = document.getElementById("image");
                      if (input) input.value = "";
                    }}
                    disabled={saving}
                  >
                    Cancel Photo Change
                  </button>
                )}
              </div>
            )}

            <div className="form-actions">
              <button
                type="submit"
                className="primary-button"
                disabled={saving || uploading}
              >
                {uploading
                  ? "Uploading Photo..."
                  : saving
                    ? "Saving..."
                    : "Save Changes"}
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/dashboard")}
                disabled={saving || uploading}
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

export default EditTrip;