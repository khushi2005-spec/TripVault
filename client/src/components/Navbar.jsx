// import { useNavigate } from "react-router-dom";
// function Navbar() {
//     const navigate = useNavigate();
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         navigate("/login");
//     };
//     return (
//         <nav className="navbar">
//             <div className="navbar-logo">
//                 TripVault
//             </div>
//             <button className="logout-btn"
//             onClick={handleLogout}
//             >
//                 Logout
//             </button>
//         </nav>
//     );
// }
// export default Navbar;

// import { useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div
//         className="nav-logo"
//         onClick={() => navigate("/dashboard")}
//         style={{ cursor: "pointer" }}
//       >
//         Trip<span>Vault</span>
//       </div>

//       <div className="nav-right">
//         <span className="nav-user">
//           Your Travel Journal
//         </span>

//         <button
//           className="logout-button"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

// import { useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();

//   // Get logged-in user
//   const storedUser = localStorage.getItem("user");

//   let user = null;

//   try {
//     user = storedUser
//       ? JSON.parse(storedUser)
//       : null;
//   } catch (error) {
//     console.error(
//       "User data error:",
//       error
//     );
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     navigate("/login");
//   };

//   const handleMyProfile = () => {
//     if (user?.username) {
//       navigate(`/profile/${user.username}`);
//     } else {
//       navigate("/edit-profile");
//     }
//   };

//   return (
//     <nav className="navbar">

//       {/* Logo */}
//       <div
//         className="nav-logo"
//         onClick={() => navigate("/dashboard")}
//         style={{ cursor: "pointer" }}
//       >
//         Trip<span>Vault</span>
//       </div>

//       {/* Right Side */}
//       <div className="nav-right">

//         <span className="nav-user">
//           Your Travel Journal
//         </span>

//         {/* My Profile */}
//         <button
//           className="profile-button"
//           onClick={handleMyProfile}
//         >
//           My Profile
//         </button>

//         {/* Edit Profile */}
//         <button
//           className="profile-button"
//           onClick={() =>
//             navigate("/edit-profile")
//           }
//         >
//           Edit Profile
//         </button>

//         {/* Logout */}
//         <button
//           className="logout-button"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>

//       </div>

//     </nav>
//   );
// }

// export default Navbar;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// function Navbar() {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const storedUser = localStorage.getItem("user");
//   let user = null;

//   try {
//     user = storedUser ? JSON.parse(storedUser) : null;
//   } catch (error) {
//     console.error("User data error:", error);
//   }

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   const handleNavigation = (path) => {
//     closeMenu();
//     navigate(path);
//   };

//   const handleMyProfile = () => {
//     closeMenu();

//     if (user?.username) {
//       navigate(`/profile/${user.username}`);
//     } else {
//       navigate("/edit-profile");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     closeMenu();
//     toast.success("Logged out successfully!");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div
//         className="nav-logo"
//         onClick={() => handleNavigation("/dashboard")}
//         role="button"
//         tabIndex={0}
//         onKeyDown={(event) => {
//           if (event.key === "Enter" || event.key === " ") {
//             handleNavigation("/dashboard");
//           }
//         }}
//       >
//         Trip<span>Vault</span>
//       </div>

//       <button
//         type="button"
//         className="menu-toggle"
//         aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
//         aria-expanded={menuOpen}
//         onClick={() => setMenuOpen((open) => !open)}
//       >
//         {menuOpen ? "✕" : "☰"}
//       </button>

//       <div className={`nav-right ${menuOpen ? "nav-right-open" : ""}`}>
//         <span className="nav-user">
//           Your Travel Journal
//         </span>

//         <button
//           type="button"
//           className="profile-button"
//           onClick={() => handleNavigation("/dashboard")}
//         >
//           Dashboard
//         </button>

//         <button
//           type="button"
//           className="profile-button"
//           onClick={handleMyProfile}
//         >
//           My Profile
//         </button>

//         <button
//           type="button"
//           className="profile-button"
//           onClick={() => handleNavigation("/edit-profile")}
//         >
//           Edit Profile
//         </button>

//         <button
//           type="button"
//           className="logout-button"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// function Navbar() {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const storedUser = localStorage.getItem("user");
//   let user = null;

//   try {
//     user = storedUser ? JSON.parse(storedUser) : null;
//   } catch (error) {
//     console.error("User data error:", error);
//   }

//   const closeMenu = () => setMenuOpen(false);

//   const handleNavigation = (path) => {
//     closeMenu();
//     navigate(path);
//   };

//   const handleMyProfile = () => {
//     closeMenu();

//     if (user?.username) {
//       navigate(`/profile/${user.username}`);
//     } else {
//       navigate("/edit-profile");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     closeMenu();
//     toast.success("Logged out successfully!");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div
//         className="nav-logo"
//         onClick={() => handleNavigation("/dashboard")}
//         role="button"
//         tabIndex={0}
//         aria-label="TripVault home"
//         onKeyDown={(event) => {
//           if (event.key === "Enter" || event.key === " ") {
//             event.preventDefault();
//             handleNavigation("/dashboard");
//           }
//         }}
//       >
//         {/* Travel logo icon */}
//         <svg
//           className="nav-logo-icon"
//           viewBox="0 0 48 48"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           aria-hidden="true"
//         >
//           <path
//             d="M24 44C19 36 7 26 7 18C7 8.6 14.6 2 24 2S41 8.6 41 18C41 26 29 36 24 44Z"
//             fill="#FF8500"
//           />
//           <circle cx="24" cy="18" r="12" fill="#171717" />
//           <path
//             d="M13 25L20 15L24 20L28 13L35 25H13Z"
//             fill="#FFFFFF"
//             stroke="#FFFFFF"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M24 20L28 13L32 20L28 18Z"
//             fill="#FF8500"
//           />
//         </svg>

//         <span className="nav-logo-text">
//           Trip<span>Vault</span>
//         </span>
//       </div>

//       <button
//         type="button"
//         className="menu-toggle"
//         aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
//         aria-expanded={menuOpen}
//         onClick={() => setMenuOpen((open) => !open)}
//       >
//         {menuOpen ? "✕" : "☰"}
//       </button>

//       <div className={`nav-right ${menuOpen ? "nav-right-open" : ""}`}>
//         <span className="nav-user">Your Travel Journal</span>

//         <button
//           type="button"
//           className="profile-button"
//           onClick={() => handleNavigation("/dashboard")}
//         >
//           Dashboard
//         </button>

//         <button
//           type="button"
//           className="profile-button"
//           onClick={handleMyProfile}
//         >
//           My Profile
//         </button>

//         <button
//           type="button"
//           className="profile-button"
//           onClick={() => handleNavigation("/edit-profile")}
//         >
//           Edit Profile
//         </button>

//         <button
//           type="button"
//           className="logout-button"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const storedUser = localStorage.getItem("user");
  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("User data error:", error);
  }

  const closeMenu = () => setMenuOpen(false);

  const handleNavigation = (path) => {
    closeMenu();
    navigate(path);
  };

  const handleMyProfile = () => {
    closeMenu();

    if (user?.username) {
      navigate(`/profile/${user.username}`);
    } else {
      navigate("/edit-profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    closeMenu();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* <div
        className="nav-logo"
        onClick={() => handleNavigation("/dashboard")}
        role="button"
        tabIndex={0}
        aria-label="TripVault home"
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleNavigation("/dashboard");
          }
        }}
      >
        <svg
          className="nav-logo-icon"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="tvNavy"
              x1="8"
              y1="5"
              x2="40"
              y2="43"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3157A4" />
              <stop offset="1" stopColor="#142858" />
            </linearGradient>

            <linearGradient
              id="tvGold"
              x1="13"
              y1="8"
              x2="34"
              y2="34"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFE8A3" />
              <stop offset="0.55" stopColor="#FBBF24" />
              <stop offset="1" stopColor="#D4A017" />
            </linearGradient>
          </defs>

          <path
            d="M24 3.5C14.8 3.5 7.5 10.6 7.5 19.5C7.5 30.1 24 44.5 24 44.5S40.5 30.1 40.5 19.5C40.5 10.6 33.2 3.5 24 3.5Z"
            fill="url(#tvNavy)"
          />

          <circle cx="24" cy="19.5" r="11.5" fill="url(#tvGold)" />

          <path
            d="M13 26L20 17L24 21L29 14L36 26H13Z"
            fill="#FFFFFF"
          />

          <path
            d="M21 20L24 23L29 17"
            stroke="#1E3A8A"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="24" cy="19.5" r="2" fill="#1E3A8A" />
        </svg>

        <span className="nav-logo-text">
          Trip<span>Vault</span>
        </span>
      </div> */}
      
<div
  className="nav-logo"
  onClick={() => handleNavigation("/dashboard")}
  role="button"
  tabIndex={0}
  aria-label="TripVault home"
  onKeyDown={(event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNavigation("/dashboard");
    }
  }}
>
  <svg
    className="nav-logo-icon"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="tvGold" x1="8" y1="7" x2="43" y2="45">
        <stop offset="0%" stopColor="#F8E5A5" />
        <stop offset="48%" stopColor="#D4A642" />
        <stop offset="100%" stopColor="#A87920" />
      </linearGradient>
    </defs>

    {/* Elegant outer frame */}
    <rect
      x="2.5"
      y="2.5"
      width="47"
      height="47"
      rx="13"
      stroke="#D4A642"
      strokeWidth="1.2"
    />

    {/* T monogram */}
    <path
      d="M11 14H34"
      stroke="#142858"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M22.5 14V38"
      stroke="#142858"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Interlocking V */}
    <path
      d="M27 21L35 38L44 17"
      stroke="url(#tvGold)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Signature gold accent */}
    <circle cx="40.5" cy="11.5" r="2" fill="#D4A642" />
  </svg>

  <span className="nav-logo-text">
    <span className="trip-word">Trip</span><span className="vault-word">Vault</span>
  </span>
</div>


      <button
        type="button"
        className="menu-toggle"
        aria-label={
          menuOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-right ${menuOpen ? "nav-right-open" : ""}`}>
        <span className="nav-user">Your Travel Journal</span>

        <button
          type="button"
          className="profile-button"
          onClick={() => handleNavigation("/dashboard")}
        >
          Dashboard
        </button>

        <button
          type="button"
          className="profile-button"
          onClick={handleMyProfile}
        >
          My Profile
        </button>

        <button
          type="button"
          className="profile-button"
          onClick={() => handleNavigation("/edit-profile")}
        >
          Edit Profile
        </button>

        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
