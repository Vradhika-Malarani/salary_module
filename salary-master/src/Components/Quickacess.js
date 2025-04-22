import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const QuickAccess = () => {
  const navigate = useNavigate();

  // Module data with title, icon, and path for navigation
  const modules = [
    { title: "Administration Login", icon: <AdminPanelSettingsIcon fontSize="large" />, path: "/adminlogin" },
    { title: "User Login", icon: <MonetizationOnIcon fontSize="large" />, path: "/payroll" }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Welcome To Payroll Management System!!
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {modules.map((module, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Box
              onClick={() => {
                console.log(`Navigating to: ${module.path}`);
                navigate(module.path);
              }}
              sx={{
                cursor: "pointer",
                backgroundColor: "red",
                color: "#fff",
                borderRadius: "8px",
                p: 3,
                textAlign: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                }
              }}
            >
              {module.icon}
              <Typography variant="h6" mt={1}>
                {module.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuickAccess;
