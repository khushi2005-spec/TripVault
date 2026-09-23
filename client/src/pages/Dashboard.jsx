// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import API from "../services/api";
// import Navbar from "../components/Navbar";

// function Dashboard() {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);
//     const [loading, setloading] = useState(true);
//     useEffect(() => {
//         const getUser = async () => {
//             try {
//                 const response = await API.get("/auth/me");
//                 setUser(response.data.user);

//             } catch(error) {
//                 localStorage.removeItem("token");
//                 localStorage.removeItem("user");
//                 navigate("/login");

//             } finally {
//                 setloading(false);
//             }
//         };
//         getUser();
//     }, [navigate]);
//     if(loading) {
//         return (
//             <div className="loading">
//                 Loading Dashboard...
//             </div>
//         );
//     }
//     return (
//         <div className="dashboard">
//             <Navbar />
//             <main className="dashboard-content">
//                 <section className="welcome-card">
//                     <div className="travel-icon">

//                     </div>
//                     <p className="small-heading">WELCOME TO TRIPVAULT</p>
//                     <h1>
//                         Hello, {user?.name}!
//                     </h1>
//                     <p>
//                         Your travel memory journey starts here.
//                     </p>
//                     <div className="user-info">
//                         <div>
//                             <span>Name</span>
//                             <strong>{user?.name}</strong>
//                         </div>
//                         <div>
//                             <span>Email</span>
//                             <strong>
//                                 {user?.email}
//                             </strong>
//                         </div>
//                         </div>
//                         </section>
//                         <section className="empty-state">
//                             <div>$</div>
//                             <h2>
//                                 Your memories are waiting
//                             </h2>
//                             <p>
//                                 Trip creation and photo uploads will be added in upcoming weeks.
//                             </p>
//                         </section>
//             </main>
//         </div>
//     );
// }
// export default Dashboard;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import API from "../services/api";
// import Navbar from "../components/Navbar";

// function Dashboard() {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [tripLoading, setTripLoading] = useState(true);

//   useEffect(() => {
//     const getDashboardData = async () => {
//       try {
//         // Get logged-in user
//         const userResponse = await API.get("/auth/me");

//         setUser(userResponse.data.user);

//         // Get user's trips
//         const tripsResponse = await API.get("/trips");

//         setTrips(tripsResponse.data.trips);
//       } catch (error) {
//         console.error("Dashboard error:", error);

//         localStorage.removeItem("token");
//         localStorage.removeItem("user");

//         navigate("/login");
//       } finally {
//         setLoading(false);
//         setTripLoading(false);
//       }
//     };

//     getDashboardData();
//   }, [navigate]);

//   if (loading) {
//     return <div className="loading">Loading Dashboard...</div>;
//   }

//   return (
//     <div className="dashboard">

//       <Navbar />

//       <main className="dashboard-content">

//         {/* Welcome Section */}
//         <section className="welcome-card">

//           <div className="travel-icon">
//             ✈️
//           </div>

//           <p className="small-heading">
//             WELCOME TO TRIPVAULT
//           </p>

//           <h1>
//             Hello, {user?.name}!
//           </h1>

//           <p>
//             Your travel memory journey starts here.
//           </p>

//           <div className="user-info">

//             <div>
//               <span>Name</span>
//               <strong>{user?.name}</strong>
//             </div>

//             <div>
//               <span>Email</span>
//               <strong>{user?.email}</strong>
//             </div>

//           </div>

//         </section>


//         {/* Trips Section */}
//         <section className="trips-section">

//           <div className="trips-header">

//             <div>
//               <p className="small-heading">
//                 YOUR TRIPS
//               </p>

//               <h2>
//                 Travel Memories
//               </h2>
//             </div>

//             <button
//               onClick={() => navigate("/create-trip")}
//             >
//               + Create Trip
//             </button>

//           </div>


//           {/* Loading Trips */}
//           {tripLoading && (
//             <p>Loading your trips...</p>
//           )}


//           {/* No Trips */}
//           {!tripLoading && trips.length === 0 && (
//             <div className="empty-state">

//               <div>
//                 ✈️
//               </div>

//               <h2>
//                 Your memories are waiting
//               </h2>

//               <p>
//                 You haven't created any trips yet.
//               </p>

//               <button
//                 onClick={() => navigate("/create-trip")}
//               >
//                 Create Your First Trip
//               </button>

//             </div>
//           )}


//           {/* Trip Cards */}
//           {!tripLoading && trips.length > 0 && (
//             <div className="trip-grid">

//               {trips.map((trip) => (
//                 <div
//                   className="trip-card"
//                   key={trip._id}
//                 >

//                   {trip.coverImage ? (
//                     <img
//                       src={trip.coverImage}
//                       alt={trip.title}
//                       className="trip-image"
//                     />
//                   ) : (
//                     <div className="trip-image-placeholder">
//                       ✈️
//                     </div>
//                   )}

//                   <div className="trip-card-content">

//                     <h3>
//                       {trip.title}
//                     </h3>

//                     <p>
//                       📍 {trip.destination}
//                     </p>

//                     <p>
//                       📅{" "}
//                       {new Date(trip.startDate).toLocaleDateString()}
//                       {" - "}
//                       {new Date(trip.endDate).toLocaleDateString()}
//                     </p>

//                     {trip.description && (
//                       <p>
//                         {trip.description}
//                       </p>
//                     )}

//                   </div>

//                 </div>
//               ))}

//             </div>
//           )}

//         </section>

//       </main>

//     </div>
//   );
// }

// export default Dashboard;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import API from "../services/api";
// import Navbar from "../components/Navbar";

// function Dashboard() {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [tripLoading, setTripLoading] = useState(true);

//   useEffect(() => {
//     const getDashboardData = async () => {
//       try {
//         // Get logged-in user
//         const userResponse = await API.get("/auth/me");

//         setUser(userResponse.data.user);

//         // Get user's trips
//         const tripsResponse = await API.get("/trips");

//         setTrips(tripsResponse.data.trips);
//       } catch (error) {
//         console.error("Dashboard error:", error);

//         localStorage.removeItem("token");
//         localStorage.removeItem("user");

//         navigate("/login");
//       } finally {
//         setLoading(false);
//         setTripLoading(false);
//       }
//     };

//     getDashboardData();
//   }, [navigate]);

//   // Delete trip
//   const handleDeleteTrip = async (tripId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this trip?"
//     );

//     if (!confirmDelete) {
//       return;
//     }

//     try {
//       await API.delete(`/trips/${tripId}`);

//       // Remove deleted trip from Dashboard
//       setTrips((prevTrips) =>
//         prevTrips.filter((trip) => trip._id !== tripId)
//       );

//     } catch (error) {
//       console.error("Delete trip error:", error);

//       alert(
//         error.response?.data?.message || "Failed to delete trip"
//       );
//     }
//   };

//   if (loading) {
//     return <div className="loading">Loading Dashboard...</div>;
//   }

//   return (
//     <div className="dashboard">

//       <Navbar />

//       <main className="dashboard-content">

//         {/* Welcome Section */}
//         <section className="welcome-card">

//           <div className="travel-icon">
//             ✈️
//           </div>

//           <p className="small-heading">
//             WELCOME TO TRIPVAULT
//           </p>

//           <h1>
//             Hello, {user?.name}!
//           </h1>

//           <p>
//             Your travel memory journey starts here.
//           </p>

//           <div className="user-info">

//             <div>
//               <span>Name</span>
//               <strong>{user?.name}</strong>
//             </div>

//             <div>
//               <span>Email</span>
//               <strong>{user?.email}</strong>
//             </div>

//           </div>

//         </section>


//         {/* Trips Section */}
//         <section className="trips-section">

//           <div className="trips-header">

//             <div>
//               <p className="small-heading">
//                 YOUR TRIPS
//               </p>

//               <h2>
//                 Travel Memories
//               </h2>
//             </div>

//             <button
//               onClick={() => navigate("/create-trip")}
//             >
//               + Create Trip
//             </button>

//           </div>


//           {/* Loading Trips */}
//           {tripLoading && (
//             <p>Loading your trips...</p>
//           )}


//           {/* No Trips */}
//           {!tripLoading && trips.length === 0 && (
//             <div className="empty-state">

//               <div>
//                 ✈️
//               </div>

//               <h2>
//                 Your memories are waiting
//               </h2>

//               <p>
//                 You haven't created any trips yet.
//               </p>

//               <button
//                 onClick={() => navigate("/create-trip")}
//               >
//                 Create Your First Trip
//               </button>

//             </div>
//           )}


//           {/* Trip Cards */}
//           {!tripLoading && trips.length > 0 && (
//             <div className="trip-grid">

//               {trips.map((trip) => (
//                 <div
//                   className="trip-card"
//                   key={trip._id}
//                 >

//                   {trip.coverImage ? (
//                     <img
//                       src={trip.coverImage}
//                       alt={trip.title}
//                       className="trip-image"
//                     />
//                   ) : (
//                     <div className="trip-image-placeholder">
//                       ✈️
//                     </div>
//                   )}

//                   <div className="trip-card-content">

//                     <h3>
//                       {trip.title}
//                     </h3>

//                     <p>
//                       📍 {trip.destination}
//                     </p>

//                     <p>
//                       📅{" "}
//                       {new Date(trip.startDate).toLocaleDateString()}
//                       {" - "}
//                       {new Date(trip.endDate).toLocaleDateString()}
//                     </p>

//                     {trip.description && (
//                       <p>
//                         {trip.description}
//                       </p>
//                     )}

//                     {/* Delete Button */}
//                     <button
//                       onClick={() => handleDeleteTrip(trip._id)}
//                     >
//                       Delete Trip
//                     </button>

//                   </div>

//                 </div>
//               ))}

//             </div>
//           )}

//         </section>

//       </main>

//     </div>
//   );
// }

// export default Dashboard;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import API from "../services/api";
// import Navbar from "../components/Navbar";

// function Dashboard() {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [tripLoading, setTripLoading] = useState(true);

//   // Get dashboard data
//   useEffect(() => {
//     const getDashboardData = async () => {
//       try {
//         // Get logged-in user
//         const userResponse = await API.get("/auth/me");

//         setUser(userResponse.data.user);

//         // Get user's trips
//         const tripsResponse = await API.get("/trips");

//         setTrips(tripsResponse.data.trips);
//       } catch (error) {
//         console.error("Dashboard error:", error);

//         localStorage.removeItem("token");
//         localStorage.removeItem("user");

//         navigate("/login");
//       } finally {
//         setLoading(false);
//         setTripLoading(false);
//       }
//     };

//     getDashboardData();
//   }, [navigate]);


//   // Delete trip
//   const handleDeleteTrip = async (tripId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this trip?"
//     );

//     if (!confirmDelete) {
//       return;
//     }

//     try {
//       await API.delete(`/trips/${tripId}`);

//       // Remove deleted trip from Dashboard
//       setTrips((prevTrips) =>
//         prevTrips.filter((trip) => trip._id !== tripId)
//       );

//     } catch (error) {
//       console.error("Delete trip error:", error);

//       alert(
//         error.response?.data?.message ||
//           "Failed to delete trip"
//       );
//     }
//   };


//   // Loading Dashboard
//   if (loading) {
//     return (
//       <div className="loading">
//         Loading Dashboard...
//       </div>
//     );
//   }


//   return (
//     <div className="dashboard">

//       {/* Navbar */}
//       <Navbar />


//       <main className="dashboard-content">

//         {/* =========================
//             Welcome Section
//         ========================== */}
//         <section className="welcome-card">

//           <div className="travel-icon">
//             ✈️
//           </div>

//           <p className="small-heading">
//             WELCOME TO TRIPVAULT
//           </p>

//           <h1>
//             Hello, {user?.name}!
//           </h1>

//           <p>
//             Your travel memory journey starts here.
//           </p>


//           {/* User Information */}
//           <div className="user-info">

//             <div>
//               <span>Name</span>

//               <strong>
//                 {user?.name}
//               </strong>
//             </div>


//             <div>
//               <span>Email</span>

//               <strong>
//                 {user?.email}
//               </strong>
//             </div>

//           </div>

//         </section>



//         {/* =========================
//             Trips Section
//         ========================== */}
//         <section className="trips-section">


//           {/* Trips Header */}
//           <div className="trips-header">

//             <div>

//               <p className="small-heading">
//                 YOUR TRIPS
//               </p>

//               <h2>
//                 Travel Memories
//               </h2>

//             </div>


//             {/* Create Trip Button */}
//             <button
//               onClick={() => navigate("/create-trip")}
//             >
//               + Create Trip
//             </button>

//           </div>



//           {/* =========================
//               Loading Trips
//           ========================== */}
//           {tripLoading && (
//             <p>
//               Loading your trips...
//             </p>
//           )}



//           {/* =========================
//               No Trips
//           ========================== */}
//           {!tripLoading && trips.length === 0 && (

//             <div className="empty-state">

//               <div>
//                 ✈️
//               </div>

//               <h2>
//                 Your memories are waiting
//               </h2>

//               <p>
//                 You haven't created any trips yet.
//               </p>


//               <button
//                 onClick={() =>
//                   navigate("/create-trip")
//                 }
//               >
//                 Create Your First Trip
//               </button>

//             </div>

//           )}



//           {/* =========================
//               Trip Cards
//           ========================== */}
//           {!tripLoading && trips.length > 0 && (

//             <div className="trip-grid">

//               {trips.map((trip) => (

//                 <div
//                   className="trip-card"
//                   key={trip._id}
//                 >


//                   {/* Trip Image */}
//                   {trip.coverImage ? (

//                     <img
//                       src={trip.coverImage}
//                       alt={trip.title}
//                       className="trip-image"
//                     />

//                   ) : (

//                     <div className="trip-image-placeholder">
//                       ✈️
//                     </div>

//                   )}



//                   {/* Trip Information */}
//                   <div className="trip-card-content">

//                     <h3>
//                       {trip.title}
//                     </h3>


//                     <p>
//                       📍 {trip.destination}
//                     </p>


//                     <p>
//                       📅{" "}
//                       {new Date(
//                         trip.startDate
//                       ).toLocaleDateString()}

//                       {" - "}

//                       {new Date(
//                         trip.endDate
//                       ).toLocaleDateString()}
//                     </p>


//                     {/* Description */}
//                     {trip.description && (

//                       <p>
//                         {trip.description}
//                       </p>

//                     )}



//                     {/* =========================
//                         Action Buttons
//                     ========================== */}

//                     <div className="trip-actions">


//                       {/* Edit Button */}
//                       <button
//                         onClick={() =>
//                           navigate(
//                             `/edit-trip/${trip._id}`
//                           )
//                         }
//                       >
//                         Edit Trip
//                       </button>


//                       {/* Delete Button */}
//                       <button
//                         onClick={() =>
//                           handleDeleteTrip(
//                             trip._id
//                           )
//                         }
//                       >
//                         Delete Trip
//                       </button>

//                     </div>

//                   </div>

//                 </div>

//               ))}

//             </div>

//           )}

//         </section>

//       </main>

//     </div>
//   );
// }

// export default Dashboard;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import API from "../services/api";
// import Navbar from "../components/Navbar";

// function Dashboard() {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getDashboardData = async () => {
//       try {
//         const userResponse = await API.get(
//           "/auth/me"
//         );

//         setUser(userResponse.data.user);

//         const tripsResponse = await API.get(
//           "/trips"
//         );

//         setTrips(tripsResponse.data.trips);
//       } catch (error) {
//         console.error(
//           "Dashboard error:",
//           error
//         );

//         localStorage.removeItem("token");
//         localStorage.removeItem("user");

//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getDashboardData();
//   }, [navigate]);

//   const handleDeleteTrip = async (tripId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this trip?"
//     );

//     if (!confirmDelete) {
//       return;
//     }

//     try {
//       await API.delete(`/trips/${tripId}`);

//       setTrips((prevTrips) =>
//         prevTrips.filter(
//           (trip) => trip._id !== tripId
//         )
//       );
//     } catch (error) {
//       console.error(
//         "Delete trip error:",
//         error
//       );

//       alert(
//         error.response?.data?.message ||
//           "Failed to delete trip"
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="loading">
//         Loading your memories...
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard">

//       <Navbar />

//       <main className="dashboard-content">

//         {/* Welcome */}

//         <section className="welcome-card">

//           <div className="travel-icon">
//             ✈️
//           </div>

//           <p className="small-heading">
//             WELCOME TO TRIPVAULT
//           </p>

//           <h1>
//             Hello, {user?.name}!
//           </h1>

//           <p>
//             Your travel memory journey starts here.
//           </p>

//           <div className="user-info">

//             <div>
//               <span>Name</span>

//               <strong>
//                 {user?.name}
//               </strong>
//             </div>

//             <div>
//               <span>Email</span>

//               <strong>
//                 {user?.email}
//               </strong>
//             </div>

//           </div>

//         </section>


//         {/* Trips */}

//         <section>

//           <div className="trips-header">

//             <div>
//               <p className="small-heading">
//                 YOUR JOURNEY
//               </p>

//               <h2>
//                 Travel Memories
//               </h2>
//             </div>

//             <button
//               className="create-button"
//               onClick={() =>
//                 navigate("/create-trip")
//               }
//             >
//               + Create Trip
//             </button>

//           </div>


//           {/* Empty */}

//           {trips.length === 0 && (

//             <div className="empty-state">

//               <div>✈️</div>

//               <h2>
//                 Your memories are waiting
//               </h2>

//               <p>
//                 You haven't created any trips yet.
//               </p>

//               <button
//                 onClick={() =>
//                   navigate("/create-trip")
//                 }
//               >
//                 Create Your First Trip
//               </button>

//             </div>

//           )}


//           {/* Trip Cards */}

//           {trips.length > 0 && (

//             <div className="trip-grid">

//               {trips.map((trip) => (

//                 <div
//                   className="trip-card"
//                   key={trip._id}
//                 >

//                   {trip.coverImage ? (

//                     <img
//                       src={trip.coverImage}
//                       alt={trip.title}
//                       className="trip-image"
//                     />

//                   ) : (

//                     <div className="trip-image-placeholder">
//                       ✈️
//                     </div>

//                   )}


//                   <div className="trip-card-content">

//                     <h3>
//                       {trip.title}
//                     </h3>

//                     <p>
//                       📍 {trip.destination}
//                     </p>

//                     <p>
//                       📅{" "}
//                       {new Date(
//                         trip.startDate
//                       ).toLocaleDateString()}{" "}
//                       -{" "}
//                       {new Date(
//                         trip.endDate
//                       ).toLocaleDateString()}
//                     </p>

//                     {trip.description && (
//                       <p>
//                         {trip.description}
//                       </p>
//                     )}


//                     <div className="trip-actions">

//                       <button
//                         className="edit-button"
//                         onClick={() =>
//                           navigate(
//                             `/edit-trip/${trip._id}`
//                           )
//                         }
//                       >
//                         Edit
//                       </button>

//                       <button
//                         className="delete-button"
//                         onClick={() =>
//                           handleDeleteTrip(
//                             trip._id
//                           )
//                         }
//                       >
//                         Delete
//                       </button>

//                     </div>

//                   </div>

//                 </div>

//               ))}

//             </div>

//           )}

//         </section>

//       </main>

//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        // Get logged-in user
        const userResponse = await API.get("/auth/me");

        setUser(userResponse.data.user);

        // Get user's trips
        const tripsResponse = await API.get("/trips");

        setTrips(tripsResponse.data.trips);
      } catch (error) {
        console.error("Dashboard error:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, [navigate]);

  // Delete Trip
  const handleDeleteTrip = async (tripId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(tripId);

      await API.delete(`/trips/${tripId}`);

      // Remove deleted trip from UI
      setTrips((prevTrips) =>
        prevTrips.filter((trip) => trip._id !== tripId)
      );
    } catch (error) {
      console.error("Delete trip error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete trip"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="loading">
        Loading your memories...
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Navbar />

      <main className="dashboard-content">

        {/* Welcome Section */}
        <section className="welcome-card">
          <div className="travel-icon">
            ✈️
          </div>

          <p className="small-heading">
            WELCOME TO TRIPVAULT
          </p>

          <h1>
            Hello, {user?.name}!
          </h1>

          <p>
            Your travel memory journey starts here.
          </p>

          <div className="user-info">

            <div>
              <span>Name</span>

              <strong>
                {user?.name}
              </strong>
            </div>

            <div>
              <span>Email</span>

              <strong>
                {user?.email}
              </strong>
            </div>

          </div>
        </section>


        {/* Trips Section */}
        <section>

          <div className="trips-header">

            <div>
              <p className="small-heading">
                YOUR JOURNEY
              </p>

              <h2>
                Travel Memories
              </h2>
            </div>

            <button
              className="create-button"
              onClick={() => navigate("/create-trip")}
            >
              + Create Trip
            </button>

          </div>


          {/* Empty State */}
          {trips.length === 0 && (
            <div className="empty-state">

              <div>
                ✈️
              </div>

              <h2>
                Your memories are waiting
              </h2>

              <p>
                You haven't created any trips yet.
              </p>

              <button
                onClick={() =>
                  navigate("/create-trip")
                }
              >
                Create Your First Trip
              </button>

            </div>
          )}


          {/* Trip Cards */}
          {trips.length > 0 && (
            <div className="trip-grid">

              {trips.map((trip) => (

                <div
                  className="trip-card"
                  key={trip._id}
                >

                  {/* Trip Image Placeholder */}
                  <div className="trip-image-placeholder">
                    ✈️
                  </div>


                  <div className="trip-card-content">

                    {/* Title */}
                    <h3>
                      {trip.title}
                    </h3>


                    {/* Destination */}
                    <p>
                      📍 {trip.destination}
                    </p>


                    {/* Dates */}
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


                    {/* Rating */}
                    {trip.rating && (
                      <p>
                        ⭐ Rating: {trip.rating}/5
                      </p>
                    )}


                    {/* Description */}
                    {trip.description && (
                      <p>
                        {trip.description}
                      </p>
                    )}


                    {/* Actions */}
                    <div className="trip-actions">

                      <button
                        className="edit-button"
                        onClick={() =>
                          navigate(
                            `/edit-trip/${trip._id}`
                          )
                        }
                      >
                        Edit
                      </button>


                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDeleteTrip(
                            trip._id
                          )
                        }
                        disabled={
                          deletingId === trip._id
                        }
                      >
                        {deletingId === trip._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default Dashboard;