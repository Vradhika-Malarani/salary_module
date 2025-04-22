import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// Database Connection
const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "user_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// 🟢 Add Employee
export const addEmployee = async (req, res) => {
    const { name, email, phone, position, salary } = req.body;

    if (!name || !email || !position || !salary) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if email already exists
        const checkEmail = "SELECT * FROM employee_payroll WHERE email = ?";
        const [existing] = await db.query(checkEmail, [email]);
        if (existing.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const sql = "INSERT INTO employee_payroll (name, email, phone, position, salary) VALUES (?, ?, ?, ?, ?)";
        const [result] = await db.query(sql, [name, email, phone, position, salary]);
        res.status(201).json({ message: "Employee added successfully!", employeeId: result.insertId });

    } catch (err) {
        console.error("❌ Database Error:", err);
        res.status(500).json({ error: "Failed to add employee" });
    }
};

// 🟢 Get Employee by ID
export const getEmployeeById = async (req, res) => {
    const employeeId = req.params.id;

    try {
        const sql = "SELECT * FROM employee_payroll WHERE id = ?";
        const [result] = await db.query(sql, [employeeId]);

        if (result.length === 0) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.status(200).json(result[0]);

    } catch (err) {
        console.error("❌ Database Error:", err);
        res.status(500).json({ error: "Failed to fetch employee" });
    }
};

// 🟢 Delete Employee
export const deleteEmployee = async (req, res) => {
    const employeeId = req.params.id;

    try {
        const sql = "DELETE FROM employee_payroll WHERE id = ?";
        const [result] = await db.query(sql, [employeeId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.status(200).json({ message: "Employee deleted successfully" });

    } catch (err) {
        console.error("❌ Database Error:", err);
        res.status(500).json({ error: "Failed to delete employee" });
    }
};

// 🟢 Update Employee
export const updateEmployee = async (req, res) => {
    const employeeId = req.params.id;
    const { name, email, phone, position, salary } = req.body;

    try {
        const sql = "UPDATE employee_payroll SET name = ?, email = ?, phone = ?, position = ?, salary = ? WHERE id = ?";
        const [result] = await db.query(sql, [name, email, phone, position, salary, employeeId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.status(200).json({ message: "Employee updated successfully" });

    } catch (err) {
        console.error("❌ Database Error:", err);
        res.status(500).json({ error: "Failed to update employee" });
    }
};

// 🟢 Get User Profile
export const getUserProfile = (req, res) => {
    const userId = req.user.id;
    const sql = "SELECT id, name, email, role FROM users WHERE id = ?";
    
    db.query(sql, [userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ error: "User not found" });
        res.status(200).json(result[0]);
    });
};

// 🟢 Update User Profile
export const updateUserProfile = (req, res) => {
    const userId = req.user.id;
    const { name, email } = req.body;
    const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    
    db.query(sql, [name, email, userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Profile updated successfully" });
    });
};

// 🟢 Get All Users (Admin Only)
export const getAllUsers = (req, res) => {
    const sql = "SELECT id, name, email, role FROM users";
    
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};
