
const crypto = require("crypto");

const allowedOrigins = new Set([
  "http://localhost:5173",
  "https://trip-vault-seven.vercel.app",
]);

const csrfMiddleware = (req, res, next) => {
  // Safe methods do not change application state.
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return next();
  }

  // Enforce CSRF checks for requests authenticated by the session cookie.
  // Bearer-only requests remain compatible during the migration.
  const sessionCookie = req.cookies?.tripvault_token;

  if (!sessionCookie) {
    return next();
  }

  // Require an approved browser origin for cookie-authenticated changes.
  const origin = req.get("origin");

  if (!origin || !allowedOrigins.has(origin)) {
    return res.status(403).json({
      message: "Request origin is not allowed",
    });
  }

  const cookieToken = req.cookies?.tripvault_csrf;
  const headerToken = req.get("x-csrf-token");

  if (
    typeof cookieToken !== "string" ||
    typeof headerToken !== "string" ||
    !cookieToken ||
    !headerToken
  ) {
    return res.status(403).json({
      message: "CSRF token is missing",
    });
  }

  const cookieBuffer = Buffer.from(cookieToken, "utf8");
  const headerBuffer = Buffer.from(headerToken, "utf8");

  if (
    cookieBuffer.length !== headerBuffer.length ||
    !crypto.timingSafeEqual(cookieBuffer, headerBuffer)
  ) {
    return res.status(403).json({
      message: "Invalid CSRF token",
    });
  }

  return next();
};

module.exports = csrfMiddleware;
