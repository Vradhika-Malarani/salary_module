import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import {
  Dashboard,
  AccountCircle,
  PersonAdd,
  AttachMoney,
  BarChart,
  Feedback,
  Logout,
  ExpandLess,
  ExpandMore
} from "@mui/icons-material";
import { Bar } from "react-chartjs-2";
import { Link, useNavigate } from "react-router-dom";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title } from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title);

const AdminDash = () => {
  const [openEmployee, setOpenEmployee] = useState(false);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const navigate = useNavigate();

  // Redirect to login page if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Chart Data
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Payroll Expenses",
        data: [3000, 4000, 3500, 5000, 4500],
        backgroundColor: "#7A73D1",
      },
    ],
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setLogoutDialog(false);
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            height: "100vh",
            position: "fixed",
          },
        }}
      >
        <Toolbar />
        <List sx={{ "& .MuiListItemText-primary": { color: "black" } }}>
          <ListItem button component={Link} to="/home">
            <ListItemIcon sx={{ color: "black" }}><Dashboard /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem button component={Link} to="/about-us">
            <ListItemIcon sx={{ color: "black" }}><AccountCircle /></ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>

          {/* Add Employee - With Dropdown */}
          <ListItem button onClick={() => setOpenEmployee(!openEmployee)}>
            <ListItemIcon sx={{ color: "black" }}><PersonAdd /></ListItemIcon>
            <ListItemText primary="Add New" />
            {openEmployee ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openEmployee} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/addemployee" sx={{ pl: 4 }}>
                <ListItemText primary="Add Employee" />
              </ListItem>
              <ListItem button component={Link} to="/addsalary" sx={{ pl: 4 }}>
                <ListItemText primary="Add Salary" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button component={Link} to="/employee-payroll">
            <ListItemIcon sx={{ color: "black" }}><AttachMoney /></ListItemIcon>
            <ListItemText primary="Employee Payroll" />
          </ListItem>

          <ListItem button component={Link} to="/salary-reports">
            <ListItemIcon sx={{ color: "black" }}><BarChart /></ListItemIcon>
            <ListItemText primary="Salary Reports" />
          </ListItem>

          <ListItem button component={Link} to="/feedback">
            <ListItemIcon sx={{ color: "black" }}><Feedback /></ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItem>

          {/* Logout Button */}
          <ListItem button onClick={() => setLogoutDialog(true)}>
            <ListItemIcon sx={{ color: "black" }}><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, marginLeft: "240px", width: "calc(100% - 240px)", overflow: "hidden" }}>
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - 240px)`, background: "#7A73D1", zIndex: 1201, left: 240 }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, color: "black" }}>
              Payroll Management System
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Dashboard Content */}
        <Box sx={{ padding: 3, paddingTop: 12, overflow: "auto", height: "calc(100vh - 64px)" }}>
          <Typography variant="h4">Welcome, Admin</Typography>

          {/* Payroll Chart */}
          <Box sx={{ width: "80%", maxWidth: "600px", margin: "20px auto" }}>
            <Typography variant="h5">Payroll Trends</Typography>
            <Bar data={data} />
          </Box>
        </Box>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialog} onClose={() => setLogoutDialog(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={handleLogout} color="error" variant="contained">
            Yes, Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDash;
