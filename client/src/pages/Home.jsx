import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="home-navbar">

        <div className="home-logo">
          Trip<span>Vault</span>
        </div>

        <div className="home-nav-buttons">

          <button
            className="home-login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="home-register"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

        </div>

      </nav>


      {/* Hero Section */}
      <section className="hero-section">

        <div className="hero-content">

          <p className="hero-label">
            YOUR JOURNEY. YOUR MEMORIES.
          </p>

          <h1>
            Keep your travel
            <br />
            memories <span>forever.</span>
          </h1>

          <p className="hero-description">
            TripVault is your personal travel journal
            where you can save, organize and revisit
            every unforgettable journey.
          </p>

          <div className="hero-buttons">

            <button
              className="hero-primary"
              onClick={() => navigate("/register")}
            >
              Start Your Journey →
            </button>

            <button
              className="hero-secondary"
              onClick={() => navigate("/login")}
            >
              I already have an account
            </button>

          </div>

        </div>


        {/* Hero Image */}
        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1500534623283-312aade485b7"
            alt="Travel destination"
          />

          <div className="floating-card">

            <div className="floating-icon">
              ✈️
            </div>

            <div>
              <strong>
                Your next adventure
              </strong>

              <p>
                is waiting...
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* Features */}
      <section className="features-section">

        <div className="section-heading">

          <p className="small-heading">
            WHY TRIPVAULT?
          </p>

          <h2>
            Everything you need for your memories
          </h2>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              📸
            </div>

            <h3>
              Save Memories
            </h3>

            <p>
              Store your favorite trips and
              unforgettable moments in one place.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🌍
            </div>

            <h3>
              Organize Trips
            </h3>

            <p>
              Keep destinations, dates and
              descriptions organized effortlessly.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🔐
            </div>

            <h3>
              Private & Secure
            </h3>

            <p>
              Your travel memories are connected
              to your personal account.
            </p>

          </div>

        </div>

      </section>


      {/* Footer */}
      <footer className="home-footer">

        <div className="home-logo">
          Trip<span>Vault</span>
        </div>

        <p>
          Your memories. Your journeys. Your vault.
        </p>

        <p className="copyright">
          © 2026 TripVault. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;