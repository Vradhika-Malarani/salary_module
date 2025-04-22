

// 🟢 Add Salary Controller
export const addSalary = async (req, res) => {
    try {
        const { employee_id, month, total_working_days, total_hra, travel_allowance, salary_reimbursement, other_salary, total_salary, basic_salary, salary_mediclaim, total_da, salary_ca, salary_dpf, total_deduction } = req.body;

        if (!employee_id || !month || !total_working_days || !total_hra || !travel_allowance || !salary_reimbursement || !other_salary || !total_salary || !basic_salary || !salary_mediclaim || !total_da || !salary_ca || !salary_dpf || !total_deduction) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const salary_file = req.file ? req.file.filename : null;

        await pool.query(
            `INSERT INTO salary_reports (employee_id, month, total_working_days, total_hra, travel_allowance, salary_reimbursement, other_salary, total_salary, basic_salary, salary_mediclaim, total_da, salary_ca, salary_dpf, total_deduction, salary_file) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [employee_id, month, total_working_days, total_hra, travel_allowance, salary_reimbursement, other_salary, total_salary, basic_salary, salary_mediclaim, total_da, salary_ca, salary_dpf, total_deduction, salary_file]
        );

        res.json({ message: "Salary details added successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
