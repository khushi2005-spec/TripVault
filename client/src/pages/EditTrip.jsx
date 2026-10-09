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

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import API from "../services/api";
// import Navbar from "../components/Navbar";

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

//   useEffect(() => {
//     const getTrip = async () => {
//       try {
//         const response = await API.get("/trips");

//         const trip = response.data.trips.find(
//           (item) => item._id === id
//         );

//         if (!trip) {
//           setError("Trip not found");
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
//         console.error(error);

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
//       const response = await API.put(
//         `/trips/${id}`,
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
//           "Failed to update trip"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="loading">
//         Loading trip...
//       </div>
//     );
//   }

//   return (
//     <div className="trip-form-page">

//       <Navbar />

//       <main className="trip-form-container">

//         <div className="trip-form-header">

//           <p className="small-heading">
//             UPDATE MEMORY
//           </p>

//           <h1>
//             Edit Your Trip
//           </h1>

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
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label>Cover Image URL</label>

//               <input
//                 type="text"
//                 name="coverImage"
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
//                   ? "Saving..."
//                   : "Save Changes"}
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

// export default EditTrip;

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import API from "../services/api";
// import Navbar from "../components/Navbar";

// function EditTrip() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [formData, setFormData] = useState({
//     title: "",
//     destination: "",
//     startDate: "",
//     endDate: "",
//     description: "",
//     rating: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   // Get existing trip
//   useEffect(() => {
//     const getTrip = async () => {
//       try {
//         const response = await API.get(`/trips/${id}`);

//         const trip = response.data.trip;

//         if (!trip) {
//           setError("Trip not found");
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

//           rating: trip.rating
//             ? String(trip.rating)
//             : "",
//         });
//       } catch (error) {
//         console.error("Get Trip Error:", error);

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

//       const response = await API.put(
//         `/trips/${id}`,
//         dataToSend
//       );

//       setMessage(response.data.message);

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);

//     } catch (error) {
//       console.error("Update Trip Error:", error);

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
//       <div className="loading">
//         Loading trip...
//       </div>
//     );
//   }


//   return (
//     <div className="trip-form-page">

//       <Navbar />

//       <main className="trip-form-container">

//         {/* Header */}
//         <div className="trip-form-header">

//           <p className="small-heading">
//             UPDATE MEMORY
//           </p>

//           <h1>
//             Edit Your Trip
//           </h1>

//         </div>


//         {/* Form Card */}
//         <div className="trip-form-card">

//           {/* Error */}
//           {error && (
//             <div className="error-message">
//               {error}
//             </div>
//           )}


//           {/* Success */}
//           {message && (
//             <div className="success-message">
//               {message}
//             </div>
//           )}


//           <form onSubmit={handleSubmit}>

//             {/* Title */}
//             <div className="form-group">

//               <label>
//                 Trip Title
//               </label>

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

//               <label>
//                 Destination
//               </label>

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

//                 <label>
//                   Start Date
//                 </label>

//                 <input
//                   type="date"
//                   name="startDate"
//                   value={formData.startDate}
//                   onChange={handleChange}
//                   required
//                 />

//               </div>


//               <div className="form-group">

//                 <label>
//                   End Date
//                 </label>

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

//               <label>
//                 Description
//               </label>

//               <textarea
//                 name="description"
//                 placeholder="Write something about your trip..."
//                 value={formData.description}
//                 onChange={handleChange}
//               />

//             </div>


//             {/* Rating */}
//             <div className="form-group">

//               <label>
//                 Rating
//               </label>

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
//                   ? "Saving..."
//                   : "Save Changes"}
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

// export default EditTrip;

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import API from "../services/api";
// import Navbar from "../components/Navbar";

// function EditTrip() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [formData, setFormData] = useState({
//     title: "",
//     destination: "",
//     startDate: "",
//     endDate: "",
//     description: "",
//     rating: "",
//   });

//   const [selectedFile, setSelectedFile] = useState(null);
//   const [preview, setPreview] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   // Get existing trip
//   useEffect(() => {
//     const getTrip = async () => {
//       try {
//         const response = await API.get(`/trips/${id}`);

//         const trip = response.data.trip;

//         if (!trip) {
//           setError("Trip not found");
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
//           rating: trip.rating
//             ? String(trip.rating)
//             : "",
//         });

//         // Show existing cover image
//         if (trip.coverImage) {
//           setPreview(trip.coverImage);
//         }
//       } catch (error) {
//         console.error("Get Trip Error:", error);

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

//   // Handle normal input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle photo selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     if (!file) {
//       return;
//     }

//     // Allow only images
//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image file.");
//       return;
//     }

//     // Maximum 5 MB
//     if (file.size > 5 * 1024 * 1024) {
//       setError("Image size must be less than 5 MB.");
//       return;
//     }

//     setError("");
//     setSelectedFile(file);

//     // Create preview
//     const imagePreview =
//       URL.createObjectURL(file);

//     setPreview(imagePreview);
//   };

//   // Upload selected photo
//   const uploadPhoto = async () => {
//     if (!selectedFile) {
//       return true;
//     }

//     try {
//       setUploading(true);

//       const formData = new FormData();

//       formData.append("image", selectedFile);

//       const response = await API.post(
//         `/trips/${id}/upload`,
//         formData
//       );

//       console.log(
//         "Photo uploaded:",
//         response.data
//       );

//       return true;
//     } catch (error) {
//       console.error(
//         "Photo Upload Error:",
//         error
//       );

//       setError(
//         error.response?.data?.message ||
//           "Failed to upload photo"
//       );

//       return false;
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Update trip
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

//       // First update trip information
//       const response = await API.put(
//         `/trips/${id}`,
//         dataToSend
//       );

//       // Then upload photo if a new one was selected
//       if (selectedFile) {
//         const uploadSuccess =
//           await uploadPhoto();

//         if (!uploadSuccess) {
//           setSaving(false);
//           return;
//         }
//       }

//       setMessage(
//         selectedFile
//           ? "Trip updated and photo uploaded successfully!"
//           : response.data.message
//       );

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1200);
//     } catch (error) {
//       console.error(
//         "Update Trip Error:",
//         error
//       );

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
//       <div className="loading">
//         Loading trip...
//       </div>
//     );
//   }

//   return (
//     <div className="trip-form-page">
//       <Navbar />

//       <main className="trip-form-container">

//         {/* Header */}
//         <div className="trip-form-header">
//           <p className="small-heading">
//             UPDATE MEMORY
//           </p>

//           <h1>
//             Edit Your Trip
//           </h1>

//           <p>
//             Update your trip details and add
//             another memory.
//           </p>
//         </div>

//         {/* Form Card */}
//         <div className="trip-form-card">

//           {/* Error */}
//           {error && (
//             <div className="error-message">
//               {error}
//             </div>
//           )}

//           {/* Success */}
//           {message && (
//             <div className="success-message">
//               {message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>

//             {/* Title */}
//             <div className="form-group">
//               <label htmlFor="title">
//                 Trip Title
//               </label>

//               <input
//                 id="title"
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
//               <label htmlFor="destination">
//                 Destination
//               </label>

//               <input
//                 id="destination"
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
//                 <label htmlFor="startDate">
//                   Start Date
//                 </label>

//                 <input
//                   id="startDate"
//                   type="date"
//                   name="startDate"
//                   value={formData.startDate}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="endDate">
//                   End Date
//                 </label>

//                 <input
//                   id="endDate"
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
//               <label htmlFor="description">
//                 Description
//               </label>

//               <textarea
//                 id="description"
//                 name="description"
//                 placeholder="Write something about your trip..."
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Rating */}
//             <div className="form-group">
//               <label htmlFor="rating">
//                 Rating
//               </label>

//               <select
//                 id="rating"
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

//             {/* Photo Upload */}
//             <div className="form-group">
//               <label htmlFor="image">
//                 Add Trip Photo
//               </label>

//               <input
//                 id="image"
//                 type="file"
//                 accept="image/jpeg,image/png,image/webp"
//                 onChange={handleFileChange}
//               />

//               <small>
//                 Select JPG, PNG or WEBP image.
//                 Maximum size: 5 MB.
//               </small>
//             </div>

//             {/* Image Preview */}
//             {preview && (
//               <div className="image-preview-container">

//                 <p className="small-heading">
//                   PHOTO PREVIEW
//                 </p>

//                 <img
//                   src={preview}
//                   alt="Trip preview"
//                   className="image-preview"
//                 />

//               </div>
//             )}

//             {/* Buttons */}
//             <div className="form-actions">

//               <button
//                 type="submit"
//                 className="primary-button"
//                 disabled={
//                   saving ||
//                   uploading
//                 }
//               >
//                 {saving || uploading
//                   ? "Saving..."
//                   : "Save Changes"}
//               </button>

//               <button
//                 type="button"
//                 className="secondary-button"
//                 onClick={() =>
//                   navigate("/dashboard")
//                 }
//                 disabled={
//                   saving ||
//                   uploading
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

// export default EditTrip;

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import API from "../services/api";
// import Navbar from "../components/Navbar";

// function EditTrip() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [formData, setFormData] = useState({
//     title: "",
//     destination: "",
//     startDate: "",
//     endDate: "",
//     description: "",
//     rating: "",
//   });

//   const [selectedFile, setSelectedFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   // Get existing trip
//   useEffect(() => {
//     const getTrip = async () => {
//       try {
//         const response = await API.get(`/trips/${id}`);
//         const trip = response.data.trip;

//         if (!trip) {
//           const errorMessage = "Trip not found.";
//           setError(errorMessage);
//           toast.error(errorMessage);
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
//           rating: trip.rating ? String(trip.rating) : "",
//         });

//         if (trip.coverImage) {
//           setPreview(trip.coverImage);
//         }
//       } catch (error) {
//         console.error("Get Trip Error:", error);

//         const errorMessage =
//           error.response?.data?.message ||
//           "Failed to load trip. Please try again.";

//         setError(errorMessage);
//         toast.error(errorMessage);
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

//   // Handle photo selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       const errorMessage = "Please select a valid image file.";
//       setError(errorMessage);
//       toast.error(errorMessage);
//       e.target.value = "";
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       const errorMessage = "Image size must be less than 5 MB.";
//       setError(errorMessage);
//       toast.error(errorMessage);
//       e.target.value = "";
//       return;
//     }

//     setError("");
//     setSelectedFile(file);

//     setPreview((previousPreview) => {
//       if (previousPreview.startsWith("blob:")) {
//         URL.revokeObjectURL(previousPreview);
//       }

//       return URL.createObjectURL(file);
//     });
//   };

//   // Upload selected photo
//   const uploadPhoto = async () => {
//     if (!selectedFile) return true;

//     try {
//       setUploading(true);

//       const imageData = new FormData();
//       imageData.append("image", selectedFile);

//       const response = await API.post(
//         `/trips/${id}/upload`,
//         imageData
//       );

//       toast.success(
//         response.data?.message || "Photo uploaded successfully!"
//       );

//       return true;
//     } catch (error) {
//       console.error("Photo Upload Error:", error);

//       const errorMessage =
//         error.response?.data?.message ||
//         "Failed to upload photo. Please try again.";

//       setError(errorMessage);
//       toast.error(errorMessage);

//       return false;
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Update trip
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

//       // Update trip information
//       const response = await API.put(`/trips/${id}`, dataToSend);

//       // Upload a new photo if selected
//       if (selectedFile) {
//         const uploadSuccess = await uploadPhoto();

//         if (!uploadSuccess) return;
//       }

//       const successMessage = selectedFile
//         ? "Trip updated and photo uploaded successfully!"
//         : response.data?.message || "Trip updated successfully!";

//       setMessage(successMessage);
//       toast.success(successMessage);

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1200);
//     } catch (error) {
//       console.error("Update Trip Error:", error);

//       const errorMessage =
//         error.response?.data?.message ||
//         "Failed to update trip. Please try again.";

//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return <div className="loading">Loading trip...</div>;
//   }

//   return (
//     <div className="trip-form-page">
//       <Navbar />

//       <main className="trip-form-container">
//         <div className="trip-form-header">
//           <p className="small-heading">UPDATE MEMORY</p>
//           <h1>Edit Your Trip</h1>
//           <p>Update your trip details and add another memory.</p>
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
//                 id="title"
//                 type="text"
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
//                 id="destination"
//                 type="text"
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
//                   id="startDate"
//                   type="date"
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
//                   id="endDate"
//                   type="date"
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
//               <label htmlFor="image">Add Trip Photo</label>
//               <input
//                 id="image"
//                 type="file"
//                 accept="image/jpeg,image/png,image/webp"
//                 onChange={handleFileChange}
//                 disabled={saving}
//               />

//               <small>
//                 Select JPG, PNG or WEBP image. Maximum size: 5 MB.
//               </small>
//             </div>

//             {preview && (
//               <div className="image-preview-container">
//                 <p className="small-heading">PHOTO PREVIEW</p>
//                 <img
//                   src={preview}
//                   alt="Trip preview"
//                   className="image-preview"
//                 />
//               </div>
//             )}

//             <div className="form-actions">
//               <button
//                 type="submit"
//                 className="primary-button"
//                 disabled={saving || uploading}
//               >
//                 {saving || uploading ? "Saving..." : "Save Changes"}
//               </button>

//               <button
//                 type="button"
//                 className="secondary-button"
//                 onClick={() => navigate("/dashboard")}
//                 disabled={saving || uploading}
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

// export default EditTrip;


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

  // Get existing trip
  const getTrip = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const response = await API.get(`/trips/${id}`);
      const trip = response.data.trip;

      if (!trip) {
        const errorMessage =
          "Trip not found. It may have been deleted.";

        setLoadError(errorMessage);

        setFormData({
          title: "",
          destination: "",
          startDate: "",
          endDate: "",
          description: "",
          rating: "",
        });

        setPreview("");
        toast.error(errorMessage);
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
        rating:
          trip.rating !== undefined && trip.rating !== null
            ? String(trip.rating)
            : "",
      });

      setPreview(trip.coverImage || "");
      setSelectedFile(null);
      setError("");
    } catch (error) {
      console.error("Get Trip Error:", error);

      const errorMessage =
        error.response?.data?.message ||
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Handle photo selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];

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
        "Image size must be less than 5 MB.";

      setError(errorMessage);
      toast.error(errorMessage);
      e.target.value = "";
      return;
    }

    setError("");
    setSelectedFile(file);

    setPreview((previousPreview) => {
      if (previousPreview.startsWith("blob:")) {
        URL.revokeObjectURL(previousPreview);
      }

      return URL.createObjectURL(file);
    });
  };

  // Upload selected photo
  const uploadPhoto = async () => {
    if (!selectedFile) return true;

    try {
      setUploading(true);

      const imageData = new FormData();
      imageData.append("image", selectedFile);

      const response = await API.post(
        `/trips/${id}/upload`,
        imageData
      );

      toast.success(
        response.data?.message ||
          "Photo uploaded successfully!"
      );

      return true;
    } catch (error) {
      console.error("Photo Upload Error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to upload photo. Please try again.";

      setError(errorMessage);
      toast.error(errorMessage);

      return false;
    } finally {
      setUploading(false);
    }
  };

  // Update trip
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

      // Update trip information
      const response = await API.put(
        `/trips/${id}`,
        dataToSend
      );

      // Upload a new photo if selected
      if (selectedFile) {
        const uploadSuccess = await uploadPhoto();

        if (!uploadSuccess) return;
      }

      const successMessage = selectedFile
        ? "Trip updated and photo uploaded successfully!"
        : response.data?.message ||
          "Trip updated successfully!";

      setMessage(successMessage);
      toast.success(successMessage);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      console.error("Update Trip Error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to update trip. Please try again.";

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading" role="status">
          Loading trip...
        </div>
      </>
    );
  }

  // Loading error state with retry button
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
          <p>
            Update your trip details and add another memory.
          </p>
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
              <label htmlFor="image">Add Trip Photo</label>
              <input
                id="image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={saving}
              />

              <small>
                Select JPG, PNG or WEBP image.
                Maximum size: 5 MB.
              </small>
            </div>

            {preview && (
              <div className="image-preview-container">
                <p className="small-heading">PHOTO PREVIEW</p>
                <img
                  src={preview}
                  alt="Trip preview"
                  className="image-preview"
                />
              </div>
            )}

            <div className="form-actions">
              <button
                type="submit"
                className="primary-button"
                disabled={saving || uploading}
              >
                {saving || uploading
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