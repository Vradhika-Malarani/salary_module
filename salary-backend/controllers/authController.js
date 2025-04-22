import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 */
export const registerUser = async (req, res) => {
    try {
        const { email, password, role = "user" } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        if (!["admin", "user"].includes(role)) {
            return res.status(400).json({ error: "Invalid role. Must be 'admin' or 'user'." });
        }

        // Check if the email already exists
        const [existingUsers] = await pool.query("SELECT email FROM usermanagement WHERE email = ?", [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query("INSERT INTO usermanagement (email, password, role) VALUES (?, ?, ?)", 
                         [email, hashedPassword, role]);

        res.json({ message: "User registered successfully" });
    } catch (err) {
        console.error("❌ Registration Error:", err);
        res.status(500).json({ error: "Server error" });
    }
};

/**
 * @desc Login user
 * @route POST /api/auth/login
 */
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const [results] = await pool.query("SELECT * FROM usermanagement WHERE email = ?", [email]);
        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3600000,
        });

        res.json({ message: "Login successful", role: user.role });
    } catch (err) {
        console.error("❌ Login Error:", err);
        res.status(500).json({ error: "Server error" });
    }
};

/**
 * @desc Logout user
 * @route POST /api/auth/logout
 */
export const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });
    res.json({ message: "Logged out successfully" });
};
