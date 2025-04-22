import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./Addemployee.css"; // Importing custom styles

const EmployeeRegistration = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/employees/register", data);
      toast.success("Employee added successfully!", { position: "top-center", autoClose: 3000 });
      reset();
    } catch (error) {
      toast.error("Failed to register employee.");
    }
  };

  return (
    <Box className="employee-registration-container">
      <Typography variant="h5" align="center" gutterBottom>
        Employee Registration
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email ID"
              {...register("email", {
                required: "Email is required",
                pattern: /^\S+@\S+$/i,
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              {...register("firstName", { required: "First Name is required" })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              {...register("lastName", { required: "Last Name is required" })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Date of Birth"
              InputLabelProps={{ shrink: true }}
              {...register("dob", { required: "Date of Birth is required" })}
              error={!!errors.dob}
              helperText={errors.dob?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nationality"
              {...register("nationality", { required: "Nationality is required" })}
              error={!!errors.nationality}
              helperText={errors.nationality?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Address"
              {...register("address", { required: "Address is required" })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="City"
              {...register("city", { required: "City is required" })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="State"
              {...register("state", { required: "State is required" })}
              error={!!errors.state}
              helperText={errors.state?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Country"
              {...register("country", { required: "Country is required" })}
              error={!!errors.country}
              helperText={errors.country?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Register As</InputLabel>
              <Select
                defaultValue=""
                {...register("registerAs", { required: "Please select a role" })}
              >
                <MenuItem value="Employee">Employee</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </Select>
              {errors.registerAs && (
                <p style={{ color: "red", fontSize: "12px" }}>{errors.registerAs.message}</p>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: /^[0-9]{10}$/,
              })}
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" fullWidth variant="contained" className="submit-button">
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" className="reset-button" onClick={() => reset()}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default EmployeeRegistration;
