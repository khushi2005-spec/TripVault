import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API, { clearCsrfToken } from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // Load the authenticated user's profile from the backend.
  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const response = await API.get("/auth/me");

        if (isMounted) {
          // Supports either common response structure.
          const profile = response.data?.user ?? response.data;
          setUser(profile);
        }
      } catch (error) {
        if (isMounted) {
          setUser(null);
          console.error(
            "Unable to load profile information:",
            error.response?.data?.message || error.message
          );
        }
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

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
      navigate(`/profile/${encodeURIComponent(user.username)}`);
    } else {
      navigate("/edit-profile");
    }
  };

  // End the server-side cookie session before navigating away.
  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    closeMenu();

    try {
      await API.post("/auth/logout");

      clearCsrfToken();
      setUser(null);
      toast.success("Logged out successfully!");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(
        "Logout error:",
        error.response?.data?.message || error.message
      );

      const message =
        error.response?.data?.message ||
        "Unable to log out securely. Please try again.";

      toast.error(message);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <nav className="navbar">
      {/* TripVault premium logo */}
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
            <linearGradient
              id="tvGold"
              x1="8"
              y1="7"
              x2="43"
              y2="45"
            >
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
          <circle
            cx="40.5"
            cy="11.5"
            r="2"
            fill="#D4A642"
          />
        </svg>

        <span className="nav-logo-text">
          <span className="trip-word">Trip</span>
          <span className="vault-word">Vault</span>
        </span>
      </div>

      {/* Mobile menu toggle */}
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

      {/* Navigation links */}
      <div
        className={`nav-right ${menuOpen ? "nav-right-open" : ""}`}
      >
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
          disabled={loggingOut}
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;