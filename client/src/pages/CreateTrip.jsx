// const handleSubmit = async (e) => {
//   e.preventDefault();

//   setError("");
//   setMessage("");

//   try {
//     console.log("Sending data:", formData);

//     const response = await API.post("/trips", formData);

//     console.log("Response:", response.data);

//     setMessage(response.data.message);

//     setTimeout(() => {
//       navigate("/dashboard");
//     }, 1000);
//   } catch (error) {
//     console.error("Trip error:", error);

//     setError(
//       error.response?.data?.message || "Failed to create trip"
//     );
//   }
// };


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";

// function CreateTrip() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     destination: "",
//     startDate: "",
//     endDate: "",
//     description: "",
//     coverImage: "",
//   });

//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setMessage("");

//     try {
//       const response = await API.post("/trips", formData);

//       setMessage(response.data.message);

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);
//     } catch (error) {
//       console.error(error);

//       setError(
//         error.response?.data?.message || "Failed to create trip"
//       );
//     }
//   };

//   return (
//     <div>
//       <h1>Create New Trip</h1>

//       <form onSubmit={handleSubmit}>
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

//         <label>Start Date</label>
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

//         <label>End Date</label>
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

//         <textarea
//           name="description"
//           placeholder="Describe your trip"
//           value={formData.description}
//           onChange={handleChange}
//         />

//         <br />
//         <br />

//         <input
//           type="text"
//           name="coverImage"
//           placeholder="Cover image URL (optional)"
//           value={formData.coverImage}
//           onChange={handleChange}
//         />

//         <br />
//         <br />

//         <button type="submit">
//           Create Trip
//         </button>
//       </form>

//       {message && <p>{message}</p>}
//       {error && <p>{error}</p>}
//     </div>
//   );
// }

// export default CreateTrip;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import API from "../services/api";
// import Navbar from "../components/Navbar";

// function CreateTrip() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     destination: "",
//     startDate: "",
//     endDate: "",
//     description: "",
//     coverImage: "",
//   });

//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [saving, setSaving] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setMessage("");
//     setSaving(true);

//     try {
//       const response = await API.post(
//         "/trips",
//         formData
//       );

//       setMessage(response.data.message);

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);
//     } catch (error) {
//       console.error(error);

//       setError(
//         error.response?.data?.message ||
//           "Failed to create trip"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="trip-form-page">
//       <Navbar />

//       <main className="trip-form-container">
//         <div className="trip-form-header">
//           <p className="small-heading">
//             NEW MEMORY
//           </p>

//           <h1>Create a New Trip</h1>
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

//             <div className="form-group">
//               <label>Trip Title</label>

//               <input
//                 type="text"
//                 name="title"
//                 placeholder="e.g. My Goa Adventure"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Destination</label>

//               <input
//                 type="text"
//                 name="destination"
//                 placeholder="e.g. Goa, India"
//                 value={formData.destination}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="date-row">

//               <div className="form-group">
//                 <label>Start Date</label>

//                 <input
//                   type="date"
//                   name="startDate"
//                   value={formData.startDate}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>End Date</label>

//                 <input
//                   type="date"
//                   name="endDate"
//                   value={formData.endDate}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//             </div>

//             <div className="form-group">
//               <label>Description</label>

//               <textarea
//                 name="description"
//                 placeholder="Write something about your trip..."
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label>Cover Image URL</label>

//               <input
//                 type="text"
//                 name="coverImage"
//                 placeholder="https://example.com/image.jpg"
//                 value={formData.coverImage}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-actions">

//               <button
//                 type="submit"
//                 className="primary-button"
//                 disabled={saving}
//               >
//                 {saving
//                   ? "Creating..."
//                   : "Create Trip"}
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

// export default CreateTrip;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import Navbar from "../components/Navbar";

function CreateTrip() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    rating: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

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
      const dataToSend = {
        title: formData.title,
        destination: formData.destination,
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.description,
        rating: formData.rating
          ? Number(formData.rating)
          : undefined,
      };

      const response = await API.post(
        "/trips",
        dataToSend
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      console.error("Create Trip Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to create trip"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="trip-form-page">
      <Navbar />

      <main className="trip-form-container">

        <div className="trip-form-header">
          <p className="small-heading">
            NEW MEMORY
          </p>

          <h1>Create a New Trip</h1>
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

            {/* Trip Title */}
            <div className="form-group">
              <label>Trip Title</label>

              <input
                type="text"
                name="title"
                placeholder="e.g. My Goa Adventure"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Destination */}
            <div className="form-group">
              <label>Destination</label>

              <input
                type="text"
                name="destination"
                placeholder="e.g. Goa, India"
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </div>

            {/* Dates */}
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

            {/* Description */}
            <div className="form-group">
              <label>Description</label>

              <textarea
                name="description"
                placeholder="Write something about your trip..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Rating */}
            <div className="form-group">
              <label>Rating</label>

              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              >
                <option value="">
                  Select Rating
                </option>

                <option value="1">
                  ⭐ 1
                </option>

                <option value="2">
                  ⭐⭐ 2
                </option>

                <option value="3">
                  ⭐⭐⭐ 3
                </option>

                <option value="4">
                  ⭐⭐⭐⭐ 4
                </option>

                <option value="5">
                  ⭐⭐⭐⭐⭐ 5
                </option>
              </select>
            </div>

            {/* Buttons */}
            <div className="form-actions">

              <button
                type="submit"
                className="primary-button"
                disabled={saving}
              >
                {saving
                  ? "Creating..."
                  : "Create Trip"}
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

export default CreateTrip;