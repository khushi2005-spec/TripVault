const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Require the JWT secret to be configured.
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured");

      return res.status(500).json({
        message: "Authentication service configuration error",
      });
    }

    let token;

    // Prefer the HttpOnly cookie when present.
    if (req.cookies && req.cookies.tripvault_token) {
      token = req.cookies.tripvault_token;
    } else {
      // Temporary backward compatibility with Bearer tokens.
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          message: "Authentication required",
        });
      }

      const parts = authHeader.split(" ");

      if (
        parts.length !== 2 ||
        parts[0] !== "Bearer" ||
        !parts[1]
      ) {
        return res.status(401).json({
          message: "Invalid authorization format",
        });
      }

      token = parts[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    if (
      !decoded ||
      typeof decoded !== "object" ||
      typeof decoded.userId !== "string" ||
      !decoded.userId.trim()
    ) {
      return res.status(401).json({
        message: "Invalid token payload",
      });
    }

    req.user = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
