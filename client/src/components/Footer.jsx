function Footer() {
  return (
    <footer className="app-footer">
      <p>
        © {new Date().getFullYear()} TripVault. All rights reserved.
      </p>

      <p>
        Built by Khushi | B.Tech Computer Science Engineering
      </p>

      <a
        href="https://github.com/khushi2005-spec"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </footer>
  );
}

export default Footer;