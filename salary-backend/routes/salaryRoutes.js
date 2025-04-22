import express from "express";
import { addSalary } from "../controllers/salaryController.js";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// 🟢 Add Salary (Admin Only)
router.post("/addsalary", authenticateToken, isAdmin, upload.single("salary_file"), addSalary);

export { router as salaryRoutes };
