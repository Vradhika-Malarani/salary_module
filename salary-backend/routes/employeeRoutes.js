const express = require("express");
const router = express.Router();
const db = require("../db");

// Add new employee
router.post("/add-employee", (req, res) => {
  const { name, contact, email, city, designation, salary } = req.body;

  const sql = `INSERT INTO employee_payroll (name, contact, email, city, designation, salary)
               VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [name, contact, email, city, designation, salary];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting employee:", err);
      return res.status(500).json({ error: "Failed to add employee" });
    }
    res.json({ message: "Employee added successfully", id: result.insertId });
  });
});

// Get employee list with selected fields only
router.get("/employees", (req, res) => {
  const sql = "SELECT id, name, contact, email, city FROM employee_payroll";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching employee list:", err);
      return res.status(500).json({ error: "Failed to fetch employees" });
    }
    res.json(results);
  });
});

module.exports = router;
