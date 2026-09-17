const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const generateToken = (userId) => {
    return jwt.sign({ userId },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

// router.post("/register", async (requestAnimationFrame, res) => {
    router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }
        if(name.trim().length < 2) {
            return res.status(400).json({
                message: "Name must contain at least 2 characters",
            });
        }
        if(password.length < 6) {
            return res.status(400).json({
                message: "Password must contain at least 6 characters",
            });
        }
        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({
            email: normalizedEmail,
        });
        if(existingUser){
            return res.status(409).json({
                message: "User already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "Registration successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
        });
    }
});

router.post("/login", async(req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }
        const normalizedEmail = email.trim().toLowerCase();
        const user = await User.findOne({
            email: normalizedEmail,
        });
        if(!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );
        if(!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const token = generateToken(user._id.toString());
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch(error){
        console.error(error);
        res.status(500).json({
            message: "Server error",
        });
    }
});

router.get("/me", authMiddleware, async (req, res) => {
    try{
        const user = await User.findById(req.user.userId).select(
            "-password"
        );
        if(!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.json({
            user,
        });
    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
        });
    }
});

module.exports = router;
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