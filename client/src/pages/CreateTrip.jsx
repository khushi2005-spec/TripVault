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
//     rating: "",
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
//       const dataToSend = {
//         title: formData.title,
//         destination: formData.destination,
//         startDate: formData.startDate,
//         endDate: formData.endDate,
//         description: formData.description,
//         rating: formData.rating
//           ? Number(formData.rating)
//           : undefined,
//       };

//       const response = await API.post(
//         "/trips",
//         dataToSend
//       );

//       setMessage(response.data.message);

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);

//     } catch (error) {
//       console.error("Create Trip Error:", error);

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

//             {/* Trip Title */}
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

//             {/* Destination */}
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

//             {/* Dates */}
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

//             {/* Description */}
//             <div className="form-group">
//               <label>Description</label>

//               <textarea
//                 name="description"
//                 placeholder="Write something about your trip..."
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Rating */}
//             <div className="form-group">
//               <label>Rating</label>

//               <select
//                 name="rating"
//                 value={formData.rating}
//                 onChange={handleChange}
//               >
//                 <option value="">
//                   Select Rating
//                 </option>

//                 <option value="1">
//                   ⭐ 1
//                 </option>

//                 <option value="2">
//                   ⭐⭐ 2
//                 </option>

//                 <option value="3">
//                   ⭐⭐⭐ 3
//                 </option>

//                 <option value="4">
//                   ⭐⭐⭐⭐ 4
//                 </option>

//                 <option value="5">
//                   ⭐⭐⭐⭐⭐ 5
//                 </option>
//               </select>
//             </div>

//             {/* Buttons */}
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
//     rating: "",
//   });

//   // Week 3: store selected image
//   const [image, setImage] = useState(null);

//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [saving, setSaving] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle image selection
//   const handleImageChange = (e) => {
//     const selectedImage = e.target.files[0];

//     if (selectedImage) {
//       setImage(selectedImage);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setMessage("");
//     setSaving(true);

//     try {
//       // Step 1: Create trip
//       const dataToSend = {
//         title: formData.title,
//         destination: formData.destination,
//         startDate: formData.startDate,
//         endDate: formData.endDate,
//         description: formData.description,
//         rating: formData.rating
//           ? Number(formData.rating)
//           : undefined,
//       };

//       const response = await API.post(
//         "/trips",
//         dataToSend
//       );

//       // Get newly created trip ID
//       const tripId = response.data.trip._id;

//       // Step 2: Upload image
//       if (image) {
//         const imageData = new FormData();

//         imageData.append("image", image);

//         await API.post(
//           `/trips/${tripId}/upload`,
//           imageData
//         );
//       }

//       // Success message
//       setMessage(
//         image
//           ? "Trip and photo uploaded successfully!"
//           : response.data.message
//       );

//       // Go to dashboard
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);

//     } catch (error) {
//       console.error("Create Trip Error:", error);

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

//             {/* Trip Title */}
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

//             {/* Destination */}
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

//             {/* Dates */}
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

//             {/* Description */}
//             <div className="form-group">
//               <label>Description</label>

//               <textarea
//                 name="description"
//                 placeholder="Write something about your trip..."
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Rating */}
//             <div className="form-group">
//               <label>Rating</label>

//               <select
//                 name="rating"
//                 value={formData.rating}
//                 onChange={handleChange}
//               >
//                 <option value="">
//                   Select Rating
//                 </option>

//                 <option value="1">
//                   ⭐ 1
//                 </option>

//                 <option value="2">
//                   ⭐⭐ 2
//                 </option>

//                 <option value="3">
//                   ⭐⭐⭐ 3
//                 </option>

//                 <option value="4">
//                   ⭐⭐⭐⭐ 4
//                 </option>

//                 <option value="5">
//                   ⭐⭐⭐⭐⭐ 5
//                 </option>
//               </select>
//             </div>

//             {/* Trip Photo - Week 3 */}
//             <div className="form-group">
//               <label>Trip Photo</label>

//               <input
//                 type="file"
//                 accept="image/jpeg,image/png,image/webp"
//                 onChange={handleImageChange}
//               />

//               {image && (
//                 <p>
//                   Selected: {image.name}
//                 </p>
//               )}
//             </div>

//             {/* Buttons */}
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

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

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
//     rating: "",
//   });

//   // Week 3: store selected image
//   const [image, setImage] = useState(null);

//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [saving, setSaving] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle image selection
//   const handleImageChange = (e) => {
//     const selectedImage = e.target.files[0];

//     if (selectedImage) {
//       setImage(selectedImage);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setMessage("");
//     setSaving(true);

//     try {
//       // Step 1: Create trip
//       const dataToSend = {
//         title: formData.title,
//         destination: formData.destination,
//         startDate: formData.startDate,
//         endDate: formData.endDate,
//         description: formData.description,
//         rating: formData.rating
//           ? Number(formData.rating)
//           : undefined,
//       };

//       const response = await API.post(
//         "/trips",
//         dataToSend
//       );

//       // Get newly created trip ID
//       const tripId = response.data.trip._id;

//       // Step 2: Upload image if selected
//       if (image) {
//         const imageData = new FormData();
//         imageData.append("image", image);

//         await API.post(
//           `/trips/${tripId}/upload`,
//           imageData
//         );
//       }

//       // Success message
//       const successMessage = image
//         ? "Trip and photo uploaded successfully!"
//         : response.data.message || "Trip created successfully!";

//       setMessage(successMessage);
//       toast.success(successMessage);

//       // Go to dashboard
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);
//     } catch (err) {
//       console.error("Create Trip Error:", err);

//       const errorMessage =
//         err.response?.data?.message ||
//         "Failed to create trip. Please try again.";

//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="trip-form-page">
//       <Navbar />

//       <main className="trip-form-container">
//         <div className="trip-form-header">
//           <p className="small-heading">NEW MEMORY</p>
//           <h1>Create a New Trip</h1>
//         </div>

//         <div className="trip-form-card">
//           {error && (
//             <div className="error-message" role="alert">
//               {error}
//             </div>
//           )}

//           {message && (
//             <div className="success-message" role="status">
//               {message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             {/* Trip Title */}
//             <div className="form-group">
//               <label htmlFor="title">Trip Title</label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 placeholder="e.g. My Goa Adventure"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//                 disabled={saving}
//               />
//             </div>

//             {/* Destination */}
//             <div className="form-group">
//               <label htmlFor="destination">Destination</label>
//               <input
//                 type="text"
//                 id="destination"
//                 name="destination"
//                 placeholder="e.g. Goa, India"
//                 value={formData.destination}
//                 onChange={handleChange}
//                 required
//                 disabled={saving}
//               />
//             </div>

//             {/* Dates */}
//             <div className="date-row">
//               <div className="form-group">
//                 <label htmlFor="startDate">Start Date</label>
//                 <input
//                   type="date"
//                   id="startDate"
//                   name="startDate"
//                   value={formData.startDate}
//                   onChange={handleChange}
//                   required
//                   disabled={saving}
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="endDate">End Date</label>
//                 <input
//                   type="date"
//                   id="endDate"
//                   name="endDate"
//                   value={formData.endDate}
//                   onChange={handleChange}
//                   required
//                   disabled={saving}
//                 />
//               </div>
//             </div>

//             {/* Description */}
//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <textarea
//                 id="description"
//                 name="description"
//                 placeholder="Write something about your trip..."
//                 value={formData.description}
//                 onChange={handleChange}
//                 disabled={saving}
//               />
//             </div>

//             {/* Rating */}
//             <div className="form-group">
//               <label htmlFor="rating">Rating</label>
//               <select
//                 id="rating"
//                 name="rating"
//                 value={formData.rating}
//                 onChange={handleChange}
//                 disabled={saving}
//               >
//                 <option value="">Select Rating</option>
//                 <option value="1">⭐ 1</option>
//                 <option value="2">⭐⭐ 2</option>
//                 <option value="3">⭐⭐⭐ 3</option>
//                 <option value="4">⭐⭐⭐⭐ 4</option>
//                 <option value="5">⭐⭐⭐⭐⭐ 5</option>
//               </select>
//             </div>

//             {/* Trip Photo - Week 3 */}
//             <div className="form-group">
//               <label htmlFor="tripPhoto">Trip Photo</label>
//               <input
//                 type="file"
//                 id="tripPhoto"
//                 accept="image/jpeg,image/png,image/webp"
//                 onChange={handleImageChange}
//                 disabled={saving}
//               />

//               {image && (
//                 <p>Selected: {image.name}</p>
//               )}
//             </div>

//             {/* Buttons */}
//             <div className="form-actions">
//               <button
//                 type="submit"
//                 className="primary-button"
//                 disabled={saving}
//               >
//                 {saving ? "Creating..." : "Create Trip"}
//               </button>

//               <button
//                 type="button"
//                 className="secondary-button"
//                 onClick={() => navigate("/dashboard")}
//                 disabled={saving}
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

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
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
//     rating: "",
//   });

//   const [image, setImage] = useState(null);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [saving, setSaving] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Validate selected image
//   const handleImageChange = (e) => {
//     const selectedImage = e.target.files[0];

//     setError("");
//     setMessage("");

//     if (!selectedImage) {
//       setImage(null);
//       return;
//     }

//     const allowedTypes = [
//       "image/jpeg",
//       "image/png",
//       "image/webp",
//     ];

//     if (!allowedTypes.includes(selectedImage.type)) {
//       const errorMessage = "Please select a JPG, PNG, or WEBP image.";
//       setError(errorMessage);
//       toast.error(errorMessage);
//       setImage(null);
//       e.target.value = "";
//       return;
//     }

//     if (selectedImage.size > 5 * 1024 * 1024) {
//       const errorMessage = "Image size must be less than 5 MB.";
//       setError(errorMessage);
//       toast.error(errorMessage);
//       setImage(null);
//       e.target.value = "";
//       return;
//     }

//     setImage(selectedImage);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setMessage("");
//     setSaving(true);

//     let createdTrip = false;

//     try {
//       // Step 1: Create trip
//       const dataToSend = {
//         title: formData.title,
//         destination: formData.destination,
//         startDate: formData.startDate,
//         endDate: formData.endDate,
//         description: formData.description,
//         rating: formData.rating
//           ? Number(formData.rating)
//           : undefined,
//       };

//       const response = await API.post("/trips", dataToSend);
//       const tripId = response.data.trip?._id;

//       if (!tripId) {
//         throw new Error(
//           "The trip was created, but its ID was not returned."
//         );
//       }

//       createdTrip = true;

//       // Step 2: Upload image if selected
//       if (image) {
//         try {
//           const imageData = new FormData();
//           imageData.append("image", image);

//           await API.post(`/trips/${tripId}/upload`, imageData);

//           toast.success("Trip and photo uploaded successfully!");
//           setMessage("Trip and photo uploaded successfully!");
//         } catch (uploadError) {
//           console.error("Photo Upload Error:", uploadError);

//           const uploadMessage =
//             uploadError.response?.data?.message ||
//             "The trip was created, but the photo upload failed.";

//           setError(
//             `Your trip was created successfully, but the photo could not be uploaded. ${uploadMessage}`
//           );

//           toast.error(
//             "Trip created, but photo upload failed. You can add the photo later."
//           );

//           return;
//         }
//       } else {
//         const successMessage =
//           response.data.message || "Trip created successfully!";

//         toast.success(successMessage);
//         setMessage(successMessage);
//       }

//       // Navigate after successful creation
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);
//     } catch (err) {
//       console.error("Create Trip Error:", err);

//       const errorMessage =
//         err.response?.data?.message ||
//         err.message ||
//         "Failed to create trip. Please try again.";

//       setError(errorMessage);

//       if (!createdTrip) {
//         toast.error(errorMessage);
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="trip-form-page">
//       <Navbar />

//       <main className="trip-form-container">
//         <div className="trip-form-header">
//           <p className="small-heading">NEW MEMORY</p>
//           <h1>Create a New Trip</h1>
//         </div>

//         <div className="trip-form-card">
//           {error && (
//             <div className="error-message" role="alert">
//               {error}
//             </div>
//           )}

//           {message && (
//             <div className="success-message" role="status">
//               {message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="title">Trip Title</label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 placeholder="e.g. My Goa Adventure"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//                 disabled={saving}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="destination">Destination</label>
//               <input
//                 type="text"
//                 id="destination"
//                 name="destination"
//                 placeholder="e.g. Goa, India"
//                 value={formData.destination}
//                 onChange={handleChange}
//                 required
//                 disabled={saving}
//               />
//             </div>

//             <div className="date-row">
//               <div className="form-group">
//                 <label htmlFor="startDate">Start Date</label>
//                 <input
//                   type="date"
//                   id="startDate"
//                   name="startDate"
//                   value={formData.startDate}
//                   onChange={handleChange}
//                   required
//                   disabled={saving}
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="endDate">End Date</label>
//                 <input
//                   type="date"
//                   id="endDate"
//                   name="endDate"
//                   value={formData.endDate}
//                   onChange={handleChange}
//                   required
//                   disabled={saving}
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <textarea
//                 id="description"
//                 name="description"
//                 placeholder="Write something about your trip..."
//                 value={formData.description}
//                 onChange={handleChange}
//                 disabled={saving}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="rating">Rating</label>
//               <select
//                 id="rating"
//                 name="rating"
//                 value={formData.rating}
//                 onChange={handleChange}
//                 disabled={saving}
//               >
//                 <option value="">Select Rating</option>
//                 <option value="1">⭐ 1</option>
//                 <option value="2">⭐⭐ 2</option>
//                 <option value="3">⭐⭐⭐ 3</option>
//                 <option value="4">⭐⭐⭐⭐ 4</option>
//                 <option value="5">⭐⭐⭐⭐⭐ 5</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="tripPhoto">Trip Photo</label>
//               <input
//                 type="file"
//                 id="tripPhoto"
//                 accept="image/jpeg,image/png,image/webp"
//                 onChange={handleImageChange}
//                 disabled={saving}
//               />

//               <small>
//                 Optional. JPG, PNG, or WEBP; maximum size 5 MB.
//               </small>

//               {image && <p>Selected: {image.name}</p>}
//             </div>

//             <div className="form-actions">
//               <button
//                 type="submit"
//                 className="primary-button"
//                 disabled={saving}
//               >
//                 {saving ? "Creating..." : "Create Trip"}
//               </button>

//               <button
//                 type="button"
//                 className="secondary-button"
//                 onClick={() => navigate("/dashboard")}
//                 disabled={saving}
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

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
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
//     rating: "",
//   });

//   const [image, setImage] = useState(null);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [saving, setSaving] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((previousData) => ({
//       ...previousData,
//       [name]: value,
//     }));
//   };

//   // Validate selected image.
//   const handleImageChange = (e) => {
//     const selectedImage = e.target.files?.[0];

//     setError("");
//     setMessage("");

//     if (!selectedImage) {
//       setImage(null);
//       return;
//     }

//     const allowedTypes = [
//       "image/jpeg",
//       "image/png",
//       "image/webp",
//     ];

//     if (!allowedTypes.includes(selectedImage.type)) {
//       const errorMessage =
//         "Please select a JPG, PNG, or WEBP image.";

//       setError(errorMessage);
//       toast.error(errorMessage);
//       setImage(null);
//       e.target.value = "";
//       return;
//     }

//     if (selectedImage.size > 5 * 1024 * 1024) {
//       const errorMessage =
//         "Image size must be less than 5 MB.";

//       setError(errorMessage);
//       toast.error(errorMessage);
//       setImage(null);
//       e.target.value = "";
//       return;
//     }

//     setImage(selectedImage);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (saving) return;

//     setError("");
//     setMessage("");

//     // Validate the date range before creating the trip.
//     if (
//       formData.startDate &&
//       formData.endDate &&
//       formData.endDate < formData.startDate
//     ) {
//       const errorMessage =
//         "End date cannot be earlier than start date.";

//       setError(errorMessage);
//       toast.error(errorMessage);
//       return;
//     }

//     setSaving(true);

//     let createdTrip = false;

//     try {
//       // Step 1: Create the trip.
//       const dataToSend = {
//         title: formData.title.trim(),
//         destination: formData.destination.trim(),
//         startDate: formData.startDate,
//         endDate: formData.endDate,
//         description: formData.description.trim(),
//         ...(formData.rating
//           ? { rating: Number(formData.rating) }
//           : {}),
//       };

//       const response = await API.post("/trips", dataToSend);

//       // Support common API response shapes.
//       const tripId =
//         response.data?.trip?._id ||
//         response.data?._id ||
//         response.data?.trip?.id ||
//         response.data?.id;

//       if (!tripId) {
//         console.error(
//           "Trip creation response did not contain a trip ID:",
//           response.data
//         );

//         throw new Error(
//           "The server response did not contain the trip ID. Check the backend response."
//         );
//       }

//       createdTrip = true;

//       // Step 2: Upload the selected image, if any.
//       if (image) {
//         try {
//           const imageData = new FormData();
//           imageData.append("image", image);

//           const uploadResponse = await API.post(
//             `/trips/${tripId}/upload`,
//             imageData
//           );

//           console.log(
//             "Photo upload successful:",
//             uploadResponse.data
//           );

//           const successMessage =
//             "Trip and photo uploaded successfully!";

//           toast.success(successMessage);
//           setMessage(successMessage);
//         } catch (uploadError) {
//           console.error(
//             "Photo Upload Error:",
//             uploadError
//           );

//           console.error(
//             "Photo Upload Response:",
//             uploadError.response?.data
//           );

//           console.error(
//             "Photo Upload HTTP Status:",
//             uploadError.response?.status
//           );

//           const uploadMessage =
//             uploadError.response?.data?.message ||
//             uploadError.message ||
//             "Unknown upload error.";

//           const userMessage =
//             `Your trip was created successfully, but the photo upload failed. ${uploadMessage}`;

//           setError(userMessage);

//           toast.error(
//             "Trip created, but photo upload failed. You can add the photo later."
//           );

//           // Keep the user on the page so the error is visible.
//           return;
//         }
//       } else {
//         const successMessage =
//           response.data?.message ||
//           "Trip created successfully!";

//         toast.success(successMessage);
//         setMessage(successMessage);
//       }

//       // Navigate only after the required operation succeeds.
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);
//     } catch (err) {
//       console.error("Create Trip Error:", err);

//       console.error(
//         "Server response:",
//         err.response?.data
//       );

//       console.error(
//         "HTTP status:",
//         err.response?.status
//       );

//       const errorMessage =
//         err.response?.data?.message ||
//         err.message ||
//         "Failed to create trip. Please try again.";

//       setError(
//         createdTrip
//           ? `The trip was created, but a later operation failed. ${errorMessage}`
//           : errorMessage
//       );

//       if (!createdTrip) {
//         toast.error(errorMessage);
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="trip-form-page">
//       <Navbar />

//       <main className="trip-form-container">
//         <div className="trip-form-header">
//           <p className="small-heading">NEW MEMORY</p>
//           <h1>Create a New Trip</h1>
//         </div>

//         <div className="trip-form-card">
//           {error && (
//             <div className="error-message" role="alert">
//               {error}
//             </div>
//           )}

//           {message && (
//             <div className="success-message" role="status">
//               {message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="title">Trip Title</label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 placeholder="e.g. My Goa Adventure"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//                 disabled={saving}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="destination">Destination</label>
//               <input
//                 type="text"
//                 id="destination"
//                 name="destination"
//                 placeholder="e.g. Goa, India"
//                 value={formData.destination}
//                 onChange={handleChange}
//                 required
//                 disabled={saving}
//               />
//             </div>

//             <div className="date-row">
//               <div className="form-group">
//                 <label htmlFor="startDate">Start Date</label>
//                 <input
//                   type="date"
//                   id="startDate"
//                   name="startDate"
//                   value={formData.startDate}
//                   onChange={handleChange}
//                   required
//                   disabled={saving}
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="endDate">End Date</label>
//                 <input
//                   type="date"
//                   id="endDate"
//                   name="endDate"
//                   value={formData.endDate}
//                   onChange={handleChange}
//                   required
//                   disabled={saving}
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <textarea
//                 id="description"
//                 name="description"
//                 placeholder="Write something about your trip..."
//                 value={formData.description}
//                 onChange={handleChange}
//                 disabled={saving}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="rating">Rating</label>
//               <select
//                 id="rating"
//                 name="rating"
//                 value={formData.rating}
//                 onChange={handleChange}
//                 disabled={saving}
//               >
//                 <option value="">Select Rating</option>
//                 <option value="1">⭐ 1</option>
//                 <option value="2">⭐⭐ 2</option>
//                 <option value="3">⭐⭐⭐ 3</option>
//                 <option value="4">⭐⭐⭐⭐ 4</option>
//                 <option value="5">⭐⭐⭐⭐⭐ 5</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="tripPhoto">Trip Photo</label>
//               <input
//                 type="file"
//                 id="tripPhoto"
//                 accept="image/jpeg,image/png,image/webp"
//                 onChange={handleImageChange}
//                 disabled={saving}
//               />

//               <small>
//                 Optional. JPG, PNG, or WEBP; maximum size 5 MB.
//               </small>

//               {image && (
//                 <p>Selected: {image.name}</p>
//               )}
//             </div>

//             <div className="form-actions">
//               <button
//                 type="submit"
//                 className="primary-button"
//                 disabled={saving}
//               >
//                 {saving ? "Creating..." : "Create Trip"}
//               </button>

//               <button
//                 type="button"
//                 className="secondary-button"
//                 onClick={() => navigate("/dashboard")}
//                 disabled={saving}
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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  // Create and clean up the local image preview URL.
  useEffect(() => {
    if (!image) {
      setImagePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(image);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [image]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  // Validate the selected image.
  const handleImageChange = (e) => {
    const selectedImage = e.target.files?.[0];

    setError("");
    setMessage("");

    if (!selectedImage) {
      setImage(null);
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedImage.type)) {
      const errorMessage =
        "Please select a JPG, PNG, or WEBP image.";

      setError(errorMessage);
      toast.error(errorMessage);
      setImage(null);
      e.target.value = "";
      return;
    }

    if (selectedImage.size > 5 * 1024 * 1024) {
      const errorMessage =
        "Image size must not exceed 5 MB.";

      setError(errorMessage);
      toast.error(errorMessage);
      setImage(null);
      e.target.value = "";
      return;
    }

    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    setError("");
    setMessage("");

    const title = formData.title.trim();
    const destination = formData.destination.trim();
    const description = formData.description.trim();

    if (!title || !destination) {
      const errorMessage =
        "Please enter a trip title and destination.";

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

    try {
      // Step 1: Create the trip.
      const dataToSend = {
        title,
        destination,
        startDate: formData.startDate,
        endDate: formData.endDate,
        description,
        ...(formData.rating
          ? { rating: Number(formData.rating) }
          : {}),
      };

      const response = await API.post("/trips", dataToSend);

      const tripId =
        response.data?.trip?._id ||
        response.data?._id ||
        response.data?.trip?.id ||
        response.data?.id;

      if (!tripId) {
        throw new Error(
          "Trip was submitted, but the server did not return a trip ID. Check the backend response before retrying."
        );
      }

      // Step 2: Upload the photo, if one was selected.
      if (image) {
        const imageData = new FormData();
        imageData.append("image", image);

        try {
          // Do not manually set Content-Type.
          // Axios/browser will set the multipart boundary.
          await API.post(
            `/trips/${tripId}/upload`,
            imageData
          );

          const successMessage =
            "Trip and photo uploaded successfully!";

          setMessage(successMessage);
          toast.success(successMessage);
        } catch (uploadError) {
          console.error(
            "Photo upload error:",
            uploadError.response?.data || uploadError
          );

          const uploadMessage =
            uploadError.response?.data?.message ||
            "Please try adding the photo again later.";

          const userMessage =
            `Your trip was created, but the photo upload failed. ${uploadMessage}`;

          setError(userMessage);
          toast.error(userMessage);

          // The trip already exists. Do not automatically
          // retry creation or navigate away.
          return;
        }
      } else {
        const successMessage =
          response.data?.message || "Trip created successfully!";

        setMessage(successMessage);
        toast.success(successMessage);
      }

      // Navigate after creation and any requested upload succeed.
      navigate("/dashboard");
    } catch (err) {
      console.error(
        "Create trip error:",
        err.response?.data || err
      );

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to create trip. Please try again.";

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="trip-form-page">
      <Navbar />

      <main className="trip-form-container">
        <div className="trip-form-header">
          <p className="small-heading">NEW MEMORY</p>
          <h1>Create a New Trip</h1>
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
                type="text"
                id="title"
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
                type="text"
                id="destination"
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
                  type="date"
                  id="startDate"
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
                  type="date"
                  id="endDate"
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
              <label htmlFor="tripPhoto">Trip Cover Photo</label>

              <input
                type="file"
                id="tripPhoto"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                disabled={saving}
              />

              <small>
                Optional. JPG, PNG, or WEBP; maximum size 5 MB.
              </small>

              {image && (
                <p>Selected: {image.name}</p>
              )}

              {imagePreview && (
                <div className="trip-image-preview">
                  <img
                    src={imagePreview}
                    alt="Preview of your selected trip cover"
                    style={{
                      display: "block",
                      width: "100%",
                      maxWidth: "400px",
                      maxHeight: "260px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginTop: "12px",
                    }}
                  />

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                      setImage(null);

                      const fileInput =
                        document.getElementById("tripPhoto");

                      if (fileInput) fileInput.value = "";
                    }}
                    disabled={saving}
                  >
                    Remove Photo
                  </button>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="primary-button"
                disabled={saving}
              >
                {saving ? "Saving Trip..." : "Create Trip"}
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/dashboard")}
                disabled={saving}
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