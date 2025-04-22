import express from "express";
import { 
    getUserProfile, 
    updateUserProfile, 
    getAllUsers, 
    addEmployee 
} from "../controllers/userController.js";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import bcrypt from "bcrypt";

const router = express.Router();

// 🟢 Register User
router.post("/register", registerUser);  // Use registerUser from authController.js
router.post("/login", loginUser); 
router.post("/logout", logoutUser); 

// 🟢 Add Employee (Separate from Register)
router.post("/add-employee", authenticateToken, isAdmin, async (req, res) => {
    try {
        const { email, password, confirmPassword, first_name, last_name, dob, nationality, full_address, city, state, country, role, mobile } = req.body;

        // ✅ Check if all fields are provided
        if (!email || !password || !confirmPassword || !first_name || !last_name || !dob || !nationality || !full_address || !city || !state || !country || !role || !mobile) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // ✅ Check if email already exists
        const [existingUser] = await pool.query("SELECT email FROM employee_payroll WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ error: "Email already exists!" });
        }

        // ✅ Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Insert employee into database
        await pool.query(
            `INSERT INTO employee_payroll (email, password, first_name, last_name, dob, nationality, full_address, city, state, country, role, mobile) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [email, hashedPassword, first_name, last_name, dob, nationality, full_address, city, state, country, role, mobile]
        );

        res.status(201).json({ message: "Employee added successfully!" });
    } catch (err) {
        console.error("Error adding employee:", err);
        res.status(500).json({ error: "Server error", details: err.message });
    }
});

// 🟢 Get User Profile (Protected)
router.get("/profile", authenticateToken, getUserProfile);

// 🟢 Update User Profile (Protected)
router.put("/profile", authenticateToken, updateUserProfile);

// 🟢 Get All Users (Admin Only)
router.get("/all", authenticateToken, isAdmin, getAllUsers);

export { router as userRoutes };
