import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ReceiptIcon from "@mui/icons-material/Receipt";

const Dashboard = () => {
  // Sample data (Replace with API calls)
  const totalEmployees = 150;
  const pendingApprovals = 5;
  const salaryReports = 12;

  // Card styles with modern UI enhancements
  const cardStyle = {
    p: 3,
    display: "flex",
    alignItems: "center",
    borderRadius: 3, // Rounded corners
    transition: "all 0.3s ease-in-out", // Smooth hover effect
    "&:hover": {
      transform: "scale(1.05)", // Slight increase in size
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", // Shadow effect
    },
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        
      </Typography>

      <Grid container spacing={3}>
        {/* Total Employees Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ ...cardStyle, background: "linear-gradient(135deg, #7A73D1, #7A73D1)", color: "white" }}>
            <PeopleIcon sx={{ fontSize: 50, mr: 2 }} />
            <Box>
              <Typography variant="h6">Total Employees</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>{totalEmployees}</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Pending Approvals Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ ...cardStyle, background: "linear-gradient(135deg, #7A73D1, #7A73D1)", color: "white" }}>
            <AssignmentIcon sx={{ fontSize: 50, mr: 2 }} />
            <Box>
              <Typography variant="h6">Pending Approvals</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>{pendingApprovals}</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Salary Reports Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ ...cardStyle, background: "linear-gradient(135deg, #7A73D1, #7A73D1)", color: "white" }}>
            <ReceiptIcon sx={{ fontSize: 50, mr: 2 }} />
            <Box>
              <Typography variant="h6">Salary Reports</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>{salaryReports}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
