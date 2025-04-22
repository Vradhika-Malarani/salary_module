import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/authRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { salaryRoutes } from "./routes/salaryRoutes.js";
import { authenticateToken, isAdmin, isUser } from "./middleware/authMiddleware.js";
import rateLimit from "express-rate-limit";
dotenv.config();
const app = express();

// ✅ CORS setup for frontend
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);


// ✅ Rate limiter to prevent spam
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit to 5 requests per IP
    message: { error: "Too many requests, please try again later." }
});

// ✅ Use authentication & user routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/salary", salaryRoutes);


// ✅ Employee Registration Route
app.post("/api/employees/add", async (req, res) => {
    try {
        const { email, password, firstName, lastName, dob, nationality, address, city, state, country, registerAs, mobile } = req.body;

        // ✅ Validate required fields
        if (!email || !password || !firstName || !lastName || !dob || !mobile) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // ✅ Check if employee already exists
        const [existingEmployee] = await pool.query("SELECT * FROM employees WHERE email = ?", [email]);
        if (existingEmployee.length > 0) {
            return res.status(400).json({ error: "Employee with this email already exists" });
        }

        // ✅ Insert employee into the database
        await pool.query(
            "INSERT INTO employees (email, password, firstName, lastName, dob, nationality, address, city, state, country, registerAs, mobile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [email, password, firstName, lastName, dob, nationality, address, city, state, country, registerAs, mobile]
        );

        res.status(201).json({ message: "Employee added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Feedback Routes
app.post("/api/feedback", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        await pool.query("INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)", [name, email, message]);
        res.status(200).json({ message: "Feedback submitted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/feedback", async (req, res) => {
    try {
        const [results] = await pool.query("SELECT * FROM feedback ORDER BY created_at DESC");
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Contact Us Routes with Rate Limiting
app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
        const { name, email, title, message } = req.body;
        if (!name || !email || !title || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        await pool.query("INSERT INTO contacts (name, email, title, message) VALUES (?, ?, ?, ?)", [name, email, title, message]);
        res.status(201).json({ message: "Contact form submitted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Admin-only Contact Retrieval
app.get("/api/contact", authenticateToken, isAdmin, async (req, res) => {
    try {
        const [results] = await pool.query("SELECT * FROM contacts ORDER BY created_at DESC");
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Protected Routes
app.get("/api/admindash", authenticateToken, isAdmin, (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard" });
});

app.get("/api/userdash", authenticateToken, isUser, (req, res) => {
    res.json({ message: "Welcome to the User Dashboard" });
});

// ✅ Health Check Route
app.get("/", (req, res) => {
    res.send("🚀 Server is running...");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
