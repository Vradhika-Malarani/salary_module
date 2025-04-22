import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Middleware to verify JWT Token
export const authenticateToken = (req, res, next) => {
    try {
        // Retrieve token from cookies or Authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(403).json({ error: "Access denied. No token provided." });
        }

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ error: "Invalid or expired token" });
            }

            req.user = user;  // Attaching user info to the request
            next();
        });
    } catch (err) {
        res.status(500).json({ error: "Authentication error" });
    }
};

// Middleware to check Admin role
export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ error: "Access denied. Admins only." });
    }
    next();
};

// Middleware to check User role
export const isUser = (req, res, next) => {
    if (!req.user || req.user.role !== "user") {
        return res.status(403).json({ error: "Access denied. Users only." });
    }
    next();
};
