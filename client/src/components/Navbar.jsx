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

  const closeMenu = () => {
    setMenuOpen(false);
  };

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
      <div
        className="nav-logo"
        onClick={() => handleNavigation("/dashboard")}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            handleNavigation("/dashboard");
          }
        }}
      >
        Trip<span>Vault</span>
      </div>

      <button
        type="button"
        className="menu-toggle"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-right ${menuOpen ? "nav-right-open" : ""}`}>
        <span className="nav-user">
          Your Travel Journal
        </span>

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