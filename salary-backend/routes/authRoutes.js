import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { pool } from '../config/db.js'; // Correct path to your DB pool

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

router.use(cookieParser());


// 🔐 Register User
router.post("/register", async (req, res) => {
    try {
        const { email, password, role = "user" } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        if (!["admin", "user"].includes(role)) {
            return res.status(400).json({ error: "Invalid role. Must be 'admin' or 'user'." });
        }

        const [existingUsers] = await pool.query(
            "SELECT email FROM usermanagement WHERE email = ?", [email]
        );
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            "INSERT INTO usermanagement (email, password, role) VALUES (?, ?, ?)",
            [email, hashedPassword, role]
        );

        res.json({ message: "User registered successfully" });
    } catch (err) {
        console.error("❌ Registration Error:", err);
        res.status(500).json({ error: "Server error" });
    }
});


// 🔐 Login User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const [results] = await pool.query(
            "SELECT * FROM usermanagement WHERE email = ?", [email]
        );
        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: "1h"
        });

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
});


// 🔐 Logout User
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });
    res.json({ message: "Logged out successfully" });
});


// 🔐 Forgot Password
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const [users] = await pool.query(
            "SELECT * FROM usermanagement WHERE email = ?", [email]
        );
        if (users.length === 0) {
            return res.status(404).json({ error: "User not found!" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour

        await pool.query(
            "UPDATE usermanagement SET resetToken = ?, resetTokenExpiry = ? WHERE email = ?",
            [resetToken, resetTokenExpiry, email]
        );

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            text: `Click the link to reset your password: ${resetLink}. This link will expire in 1 hour.`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Password reset link sent to your email!" });
    } catch (error) {
        console.error("❌ Forgot Password Error:", error);
        res.status(500).json({ error: "Server error. Try again later!" });
    }
});


// 🔐 Reset Password
router.post("/reset-password", async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ error: "Token and new password are required" });
        }

        const [users] = await pool.query(
            "SELECT * FROM usermanagement WHERE resetToken = ? AND resetTokenExpiry > ?",
            [token, Date.now()]
        );

        if (users.length === 0) {
            return res.status(400).json({ error: "Invalid or expired token!" });
        }

        const user = users[0];

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query(
            "UPDATE usermanagement SET password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE id = ?",
            [hashedPassword, user.id]
        );

        res.json({ message: "Password reset successful!" });
    } catch (error) {
        console.error("❌ Reset Password Error:", error);
        res.status(500).json({ error: "Server error. Try again later!" });
    }
});


// ✅ Export Routes
export { router as authRoutes };
