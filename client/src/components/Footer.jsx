// function Footer() {
//   return (
//     <footer className="app-footer">
//       <p>
//         © {new Date().getFullYear()} TripVault. All rights reserved.
//       </p>

//       <p>
//         Built by Khushi | B.Tech Computer Science Engineering
//       </p>

//       <a
//         href="https://github.com/khushi2005-spec"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         GitHub
//       </a>
//     </footer>
//   );
// }

// export default Footer;

import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p className="footer-brand">TripVault</p>

        <p className="footer-tagline">
          Every journey deserves to be remembered.
        </p>

        <div className="footer-divider" />

        <p className="footer-credit">
          Built with <span className="footer-heart">♥</span> by{" "}
          <span className="footer-author">Khushi</span>
        </p>

        <p className="footer-copyright">
          © {new Date().getFullYear()} TripVault. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;