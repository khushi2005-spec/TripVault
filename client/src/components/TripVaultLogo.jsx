
import "./TripVaultLogo.css";

function TripVaultLogo({ light = false, compact = false }) {
  return (
    <div
      className={`tripvault-logo ${light ? "logo-light" : ""} ${
        compact ? "logo-compact" : ""
      }`}
      aria-label="TripVault"
    >
      <svg
        className="tripvault-logo-icon"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Bold orange location pin */}
        <path
          d="M24 44C19 36 7 26 7 18C7 8.6 14.6 2 24 2S41 8.6 41 18C41 26 29 36 24 44Z"
          fill="#FF8500"
        />

        {/* Black center */}
        <circle cx="24" cy="18" r="12" fill="#171717" />

        {/* White mountain / travel trail */}
        <path
          d="M13 25L20 15L24 20L28 13L35 25H13Z"
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Orange summit */}
        <path
          d="M24 20L28 13L32 20L28 18L24 20Z"
          fill="#FF8500"
        />
      </svg>

      <span className="tripvault-logo-word">
        Trip<span>Vault</span>
      </span>
    </div>
  );
}

export default TripVaultLogo;
