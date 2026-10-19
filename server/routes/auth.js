// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const User = require("../models/user");
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();
// const generateToken = (userId) => {
//     return jwt.sign({ userId },
//         process.env.JWT_SECRET,
//         {
//             expiresIn: "7d",
//         }
//     );
// };

// // router.post("/register", async (requestAnimationFrame, res) => {
//     router.post("/register", async (req, res) => {
//     try {
//         console.log("REGISTER ROUTE HIT");
//         // const { name, email, password } = req.body;
//         const { name, username, email, password } = req.body;
//         // if(!name || !email || !password) {
//         //     return res.status(400).json({
//         //         message: "Name, email and password are required",
//         //     });
//         // }
//         if (!name?.trim() || !username?.trim() || !email?.trim() || !password) {
//     return res.status(400).json({
//         message: "Name, username, email and password are required",
//     });
// }
//         if(name.trim().length < 2) {
//             return res.status(400).json({
//                 message: "Name must contain at least 2 characters",
//             });
//         }
//         if(password.length < 6) {
//             return res.status(400).json({
//                 message: "Password must contain at least 6 characters",
//             });
//         }
//         // const normalizedEmail = email.trim().toLowerCase();
//         // const existingUser = await User.findOne({
//         //     email: normalizedEmail,
//         // });
//         const normalizedEmail = email.trim().toLowerCase();
//         const normalizedUsername = username.trim().toLowerCase();
//         const existingEmail = await User.findOne({
//     email: normalizedEmail,
// });

// if (existingEmail) {
//     return res.status(409).json({
//         message: "An account with this email already exists",
//     });
// }

// if (!/^[a-z0-9_]{3,20}$/.test(normalizedUsername)) {
//     return res.status(400).json({
//         message: "Username must be 3–20 characters and contain only letters, numbers and underscores",
//     });
// }
//         // if(existingUser){
//         //     return res.status(409).json({
//         //         message: "User already exists",
//         //     });
//         // }
//         const existingUsername = await User.findOne({
//     username: normalizedUsername,
// });

// if (existingUsername) {
//     return res.status(409).json({
//         message: "Username is already taken",
//     });
// }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         // const user = await User.create({
//         //     name: name.trim(),
//         //     email: normalizedEmail,
//         //     password: hashedPassword,
//         // });
//         const user = await User.create({
//     name: name.trim(),
//     username: normalizedUsername,
//     email: normalizedEmail,
//     password: hashedPassword,
// });

//         res.status(201).json({
//             message: "Registration successful",
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 username: user.username,
//                 email: user.email,
//             },
//         });
//     } catch(error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Server error",
//         });
//     }
// });

// router.post("/login", async(req, res) => {
//     try{
//         const { email, password } = req.body;
//         if(!email || !password) {
//             return res.status(400).json({
//                 message: "Email and password are required",
//             });
//         }
//         const normalizedEmail = email.trim().toLowerCase();
//         const user = await User.findOne({
//             email: normalizedEmail,
//         });
//         if(!user) {
//             return res.status(401).json({
//                 message: "Invalid email or password",
//             });
//         }
//         const isPasswordCorrect = await bcrypt.compare(
//             password,
//             user.password
//         );
//         if(!isPasswordCorrect) {
//             return res.status(401).json({
//                 message: "Invalid email or password",
//             });
//         }
//         const token = generateToken(user._id.toString());
//         res.json({
//             message: "Login successful",
//             token,
//             // user: {
//             //     id: user._id,
//             //     name: user.name,
//             //     email: user.email,
//             // },
            
// user: {
//     id: user._id,
//     name: user.name,
//     username: user.username,
//     email: user.email,
// },

//         });
//     } catch(error){
//         console.error(error);
//         res.status(500).json({
//             message: "Server error",
//         });
//     }
// });

// router.get("/me", authMiddleware, async (req, res) => {
//     try{
//         const user = await User.findById(req.user.userId).select(
//             "-password"
//         );
//         if(!user) {
//             return res.status(404).json({
//                 message: "User not found",
//             });
//         }
//         res.json({
//             user,
//         });
//     } catch(error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Server error",
//         });
//     }
// });

// module.exports = router;
// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;

//         if (!authHeader) {
//             return res.status(401).json({
//                 message: "No authorization header",
//             });
//         }

//         const parts = authHeader.split(" ");

//         if (parts.length !== 2 || parts[0] !== "Bearer") {
//             return res.status(401).json({
//                 message: "Invalid authorization format",
//             });
//         }

//         const token = parts[1];

//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         );

//         req.user = decoded;

//         next();

//     } catch (error) {
//         console.error("Auth error:", error.message);

//         return res.status(401).json({
//             message: "Invalid or expired token",
//         });
//     }
// };

// module.exports = authMiddleware;


// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const rateLimit = require("express-rate-limit");

// const User = require("../models/user");
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();

// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   limit: 10,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: {
//     message: "Too many login attempts. Please try again in 15 minutes.",
//   },
// });

// const registerLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour
//   limit: 10,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: {
//     message: "Too many registration attempts. Please try again later.",
//   },
// });


// // Validation helpers
// const isValidEmail = (email) => {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// };

// const isValidUsername = (username) => {
//   return /^[a-z0-9_]{3,20}$/.test(username);
// };

// const generateToken = (userId) => {
//   const secret = process.env.JWT_SECRET;

//   if (!secret) {
//     throw new Error("JWT_SECRET is not configured");
//   }
//   const getCookieOptions = () => ({
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//   path: "/",
//   maxAge: 7 * 24 * 60 * 60 * 1000,
// });

//   return jwt.sign(
//     { userId },
//     secret,
//     { expiresIn: "7d" }
//   );
// };

// // REGISTER
// // POST /api/auth/register
// // router.post("/register", async (req, res) => {
//   router.post("/register", registerLimiter, async (req, res) => {
//   try {
//     const { name, username, email, password } = req.body || {};

//     // Required fields
//     if (
//       typeof name !== "string" ||
//       typeof username !== "string" ||
//       typeof email !== "string" ||
//       typeof password !== "string" ||
//       !name.trim() ||
//       !username.trim() ||
//       !email.trim() ||
//       !password
//     ) {
//       return res.status(400).json({
//         message: "Name, username, email and password are required",
//       });
//     }

//     const normalizedName = name.trim();
//     const normalizedUsername = username.trim().toLowerCase();
//     const normalizedEmail = email.trim().toLowerCase();

//     // Name validation
//     if (normalizedName.length < 2 || normalizedName.length > 80) {
//       return res.status(400).json({
//         message: "Name must contain between 2 and 80 characters",
//       });
//     }

//     // Username validation
//     if (!isValidUsername(normalizedUsername)) {
//       return res.status(400).json({
//         message:
//           "Username must be 3–20 characters and contain only letters, numbers and underscores",
//       });
//     }

//     // Email validation
//     if (normalizedEmail.length > 254 || !isValidEmail(normalizedEmail)) {
//       return res.status(400).json({
//         message: "Please provide a valid email address",
//       });
//     }

//     // Password validation
//     if (password.length < 6 || password.length > 128) {
//       return res.status(400).json({
//         message: "Password must contain between 6 and 128 characters",
//       });
//     }

//     // Check for an existing email
//     const existingEmail = await User.findOne({
//       email: normalizedEmail,
//     });

//     if (existingEmail) {
//       return res.status(409).json({
//         message: "An account with this email already exists",
//       });
//     }

//     // Check for an existing username
//     const existingUsername = await User.findOne({
//       username: normalizedUsername,
//     });

//     if (existingUsername) {
//       return res.status(409).json({
//         message: "Username is already taken",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name: normalizedName,
//       username: normalizedUsername,
//       email: normalizedEmail,
//       password: hashedPassword,
//     });

//     return res.status(201).json({
//       message: "Registration successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         username: user.username,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Registration Error:", error.message);

//     // Handle duplicate-key errors if a database unique index
//     // rejects a concurrent registration.
//     if (error.code === 11000) {
//       const duplicateField = Object.keys(error.keyPattern || {})[0];

//       return res.status(409).json({
//         message:
//           duplicateField === "username"
//             ? "Username is already taken"
//             : "An account with this email already exists",
//       });
//     }

//     return res.status(500).json({
//       message: "Server error during registration",
//     });
//   }
// });

// // LOGIN
// // POST /api/auth/login
// // router.post("/login", async (req, res) => {
//   router.post("/login", loginLimiter, async (req, res) => {
//   try {
//     const { email, password } = req.body || {};

//     if (
//       typeof email !== "string" ||
//       typeof password !== "string" ||
//       !email.trim() ||
//       !password
//     ) {
//       return res.status(400).json({
//         message: "Email and password are required",
//       });
//     }

//     const normalizedEmail = email.trim().toLowerCase();

//     if (
//       normalizedEmail.length > 254 ||
//       !isValidEmail(normalizedEmail) ||
//       password.length > 128
//     ) {
//       return res.status(400).json({
//         message: "Please provide valid login credentials",
//       });
//     }

//     const user = await User.findOne({
//       email: normalizedEmail,
//     });

//     if (!user) {
//       return res.status(401).json({
//         message: "Invalid email or password",
//       });
//     }

//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       user.password
//     );

//     if (!isPasswordCorrect) {
//       return res.status(401).json({
//         message: "Invalid email or password",
//       });
//     }

//     const token = generateToken(user._id.toString());
//     res.cookie("tripvault_token", token, getCookieOptions());

//     return res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         username: user.username,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Login Error:", error.message);

//     return res.status(500).json({
//       message: "Server error during login",
//     });
//   }
// });
// // LOGOUT
// // POST /api/auth/logout
// router.post("/logout", (req, res) => {
//   const { maxAge, ...clearOptions } = getCookieOptions();

//   res.clearCookie("tripvault_token", clearOptions);

//   return res.status(200).json({
//     message: "Logged out successfully",
//   });
// });

// // GET CURRENT USER
// // GET /api/auth/me
// router.get("/me", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       user,
//     });
//   } catch (error) {
//     console.error("Get Current User Error:", error.message);

//     return res.status(500).json({
//       message: "Server error while retrieving user",
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const crypto = require("crypto");

const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const csrfCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: 60 * 60 * 1000,
});

// GET /api/auth/csrf
router.get("/csrf", (req, res) => {
  const csrfToken = crypto.randomBytes(32).toString("hex");

  res.cookie("tripvault_csrf", csrfToken, csrfCookieOptions());

  return res.status(200).json({
    csrfToken,
  });
});


// Login rate limiter: maximum 10 attempts per 15 minutes.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
});

// Registration rate limiter: maximum 10 attempts per hour.
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many registration attempts. Please try again later.",
  },
});

// Cookie settings for authentication.
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

// Validation helpers.
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidUsername = (username) => {
  return /^[a-z0-9_]{3,20}$/.test(username);
};

// Generate a JWT for the authenticated user.
const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({ userId }, secret, {
    expiresIn: "7d",
    algorithm: "HS256",
  });
};

// REGISTER
// POST /api/auth/register
router.post("/register", registerLimiter, async (req, res) => {
  try {
    const { name, username, email, password } = req.body || {};

    // Required fields.
    if (
      typeof name !== "string" ||
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Name, username, email and password are required",
      });
    }

    const normalizedName = name.trim();
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();

    // Name validation.
    if (normalizedName.length < 2 || normalizedName.length > 80) {
      return res.status(400).json({
        message: "Name must contain between 2 and 80 characters",
      });
    }

    // Username validation.
    if (!isValidUsername(normalizedUsername)) {
      return res.status(400).json({
        message:
          "Username must be 3–20 characters and contain only letters, numbers and underscores",
      });
    }

    // Email validation.
    if (
      normalizedEmail.length > 254 ||
      !isValidEmail(normalizedEmail)
    ) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    // Password validation.
    if (password.length < 6 || password.length > 128) {
      return res.status(400).json({
        message: "Password must contain between 6 and 128 characters",
      });
    }

    // Check for an existing email.
    const existingEmail = await User.findOne({
      email: normalizedEmail,
    });

    if (existingEmail) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    // Check for an existing username.
    const existingUsername = await User.findOne({
      username: normalizedUsername,
    });

    if (existingUsername) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }

    // Hash the password before saving.
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: normalizedName,
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error.message);

    // Handle duplicate-key errors from MongoDB.
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern || {})[0];

      return res.status(409).json({
        message:
          duplicateField === "username"
            ? "Username is already taken"
            : "An account with this email already exists",
      });
    }

    return res.status(500).json({
      message: "Server error during registration",
    });
  }
});

// LOGIN
// POST /api/auth/login
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedEmail.length > 254 ||
      !isValidEmail(normalizedEmail) ||
      password.length > 128
    ) {
      return res.status(400).json({
        message: "Please provide valid login credentials",
      });
    }

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id.toString());

    // Set an HttpOnly cookie for the upcoming cookie-auth migration.
    // res.cookie("tripvault_token", token, getCookieOptions());

    // Keep returning the token temporarily so the current frontend
    // continues to work during the migration.
    // return res.status(200).json({
    //   message: "Login successful",
    //   token,
    //   user: {
    //     id: user._id,
    //     name: user.name,
    //     username: user.username,
    //     email: user.email,
    //   },
    // });
    res.cookie("tripvault_token", token, getCookieOptions());

return res.status(200).json({
  message: "Login successful",
  user: {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
  },
});
  } catch (error) {
    console.error("Login Error:", error.message);

    return res.status(500).json({
      message: "Server error during login",
    });
  }
});

// LOGOUT
// POST /api/auth/logout
// router.post("/logout", (req, res) => {
//   const { maxAge, ...clearOptions } = getCookieOptions();

//   res.clearCookie("tripvault_token", clearOptions);

//   return res.status(200).json({
//     message: "Logged out successfully",
//   });
// });
// LOGOUT
// POST /api/auth/logout
router.post("/logout", (req, res) => {
  const { maxAge, ...authCookieOptions } = getCookieOptions();
  const { maxAge: csrfMaxAge, ...csrfOptions } = csrfCookieOptions();

  res.clearCookie("tripvault_token", authCookieOptions);
  res.clearCookie("tripvault_csrf", csrfOptions);

  return res.status(200).json({
    message: "Logged out successfully",
  });
});

// GET CURRENT USER
// GET /api/auth/me
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get Current User Error:", error.message);

    return res.status(500).json({
      message: "Server error while retrieving user",
    });
  }
});

module.exports = router;
