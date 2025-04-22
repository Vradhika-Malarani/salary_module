import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Home, AccountCircle, MonetizationOn, Info, Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const UserDash = () => {
  const [logoutDialog, setLogoutDialog] = useState(false);
  const navigate = useNavigate();

  const registeredUserName = "Vradhika"; // Replace with actual user data

  const salaryHistory = [
    { month: "January", amount: "₹50,000", status: "Paid" },
    { month: "February", amount: "₹50,000", status: "Pending" },
    { month: "March", amount: "₹50,000", status: "Paid" },
  ];

  const handleLogout = () => {
    setLogoutDialog(false);
    navigate("/"); // Redirecting to login/homepage after logout
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            height: "100vh",
            position: "fixed",
            background: "#fff",
            color: "black",
          },
        }}
      >
        <Toolbar />
        <List>
          {[
            { text: "Home", icon: <Home />, path: "/Home" },
            { text: "About", icon: <Info />, path: "/Aboutus" },
            { text: "My Account", icon: <AccountCircle />, path: "/MyAccount" },
            { text: "My Salary", icon: <MonetizationOn />, path: "/MySalary" },
          ].map((item, index) => (
            <ListItem button component={Link} to={item.path} key={index}>
              <ListItemIcon sx={{ color: "black" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: "black" }} />
            </ListItem>
          ))}
          <ListItem button onClick={() => setLogoutDialog(true)}>
            <ListItemIcon sx={{ color: "black" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: "black" }} />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, marginLeft: "240px", padding: 3 }}>
        <AppBar position="fixed" sx={{ width: `calc(100% - 240px)`, background: " #7A73D1" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Payroll Management System
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ paddingTop: 10 }}>
          <Typography variant="h4">Welcome, {registeredUserName}</Typography>

          {/* Salary Summary Cards */}
          <Grid container spacing={3} sx={{ marginTop: 3 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ background: " #7A73D1", color: "white" }}>
                <CardContent>
                  <Typography variant="h6">Total Salary Earned</Typography>
                  <Typography variant="h4">₹1,50,000</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ background: " #7A73D1", color: "white" }}>
                <CardContent>
                  <Typography variant="h6">Last Month's Salary</Typography>
                  <Typography variant="h4">₹50,000</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Salary History Table */}
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h5">Recent Salary Payments</Typography>
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: " #7A73D1" }}>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Month</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Amount</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salaryHistory.map((salary, index) => (
                    <TableRow key={index}>
                      <TableCell>{salary.month}</TableCell>
                      <TableCell>{salary.amount}</TableCell>
                      <TableCell>{salary.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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

export default UserDash;
