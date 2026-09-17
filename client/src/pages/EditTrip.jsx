// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import API from "../services/api";

// function EditTrip() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [formData, setFormData] = useState({
//     title: "",
//     destination: "",
//     startDate: "",
//     endDate: "",
//     description: "",
//     coverImage: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   // Get trip details
//   useEffect(() => {
//     const getTrip = async () => {
//       try {
//         const response = await API.get("/trips");

//         const trips = response.data.trips;

//         const trip = trips.find((item) => item._id === id);

//         if (!trip) {
//           setError("Trip not found");
//           setLoading(false);
//           return;
//         }

//         setFormData({
//           title: trip.title || "",
//           destination: trip.destination || "",
//           startDate: trip.startDate
//             ? trip.startDate.substring(0, 10)
//             : "",
//           endDate: trip.endDate
//             ? trip.endDate.substring(0, 10)
//             : "",
//           description: trip.description || "",
//           coverImage: trip.coverImage || "",
//         });
//       } catch (error) {
//         console.error("Get trip error:", error);

//         setError(
//           error.response?.data?.message ||
//             "Failed to load trip"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     getTrip();
//   }, [id]);


//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };


//   // Update trip
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setMessage("");
//     setSaving(true);

//     try {
//       const response = await API.put(
//         `/trips/${id}`,
//         formData
//       );

//       setMessage(response.data.message);

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);
//     } catch (error) {
//       console.error("Update trip error:", error);

//       setError(
//         error.response?.data?.message ||
//           "Failed to update trip"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };


//   // Loading
//   if (loading) {
//     return (
//       <div>
//         Loading trip...
//       </div>
//     );
//   }


//   return (
//     <div>
//       <h1>Edit Trip</h1>

//       {error && (
//         <p style={{ color: "red" }}>
//           {error}
//         </p>
//       )}

//       {message && (
//         <p style={{ color: "green" }}>
//           {message}
//         </p>
//       )}

//       <form onSubmit={handleSubmit}>

//         {/* Trip Title */}
//         <input
//           type="text"
//           name="title"
//           placeholder="Trip title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />

//         <br />
//         <br />


//         {/* Destination */}
//         <input
//           type="text"
//           name="destination"
//           placeholder="Destination"
//           value={formData.destination}
//           onChange={handleChange}
//           required
//         />

//         <br />
//         <br />


//         {/* Start Date */}
//         <label>
//           Start Date
//         </label>

//         <br />

//         <input
//           type="date"
//           name="startDate"
//           value={formData.startDate}
//           onChange={handleChange}
//           required
//         />

//         <br />
//         <br />


//         {/* End Date */}
//         <label>
//           End Date
//         </label>

//         <br />

//         <input
//           type="date"
//           name="endDate"
//           value={formData.endDate}
//           onChange={handleChange}
//           required
//         />

//         <br />
//         <br />


//         {/* Description */}
//         <textarea
//           name="description"
//           placeholder="Describe your trip"
//           value={formData.description}
//           onChange={handleChange}
//         />

//         <br />
//         <br />


//         {/* Cover Image */}
//         <input
//           type="text"
//           name="coverImage"
//           placeholder="Cover image URL (optional)"
//           value={formData.coverImage}
//           onChange={handleChange}
//         />

//         <br />
//         <br />


//         {/* Update Button */}
//         <button
//           type="submit"
//           disabled={saving}
//         >
//           {saving ? "Updating..." : "Update Trip"}
//         </button>


//         {" "}


//         {/* Cancel Button */}
//         <button
//           type="button"
//           onClick={() => navigate("/dashboard")}
//         >
//           Cancel
//         </button>

//       </form>
//     </div>
//   );
// }

// export default EditTrip;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    coverImage: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getTrip = async () => {
      try {
        const response = await API.get("/trips");

        const trip = response.data.trips.find(
          (item) => item._id === id
        );

        if (!trip) {
          setError("Trip not found");
          return;
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
          coverImage: trip.coverImage || "",
        });
      } catch (error) {
        console.error(error);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setSaving(true);

    try {
      const response = await API.put(
        `/trips/${id}`,
        formData
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to update trip"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading trip...
      </div>
    );
  }

  return (
    <div className="trip-form-page">

      <Navbar />

      <main className="trip-form-container">

        <div className="trip-form-header">

          <p className="small-heading">
            UPDATE MEMORY
          </p>

          <h1>
            Edit Your Trip
          </h1>

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

            <div className="form-group">
              <label>Trip Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Destination</label>

              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </div>

            <div className="date-row">

              <div className="form-group">
                <label>Start Date</label>

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>End Date</label>

                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Cover Image URL</label>

              <input
                type="text"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">

              <button
                type="submit"
                className="primary-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
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

export default EditTrip;