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

import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div
        className="nav-logo"
        onClick={() => navigate("/dashboard")}
        style={{ cursor: "pointer" }}
      >
        Trip<span>Vault</span>
      </div>

      <div className="nav-right">
        <span className="nav-user">
          Your Travel Journal
        </span>

        <button
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