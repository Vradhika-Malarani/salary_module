import React from "react";
import "./Addsalary.css";
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

const Addsalary = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Box className="salary-entry-container">
      <Typography variant="h5" align="center" mb={2}>
        Salary Entry Form
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Select User */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Select User</InputLabel>
              <Select {...register("user")} defaultValue="">
                <MenuItem value="">Select User</MenuItem>
                <MenuItem value="User1">User 1</MenuItem>
                <MenuItem value="User2">User 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Select Month */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Select Month</InputLabel>
              <Select {...register("month")} defaultValue="">
                <MenuItem value="">Select Month</MenuItem>
                <MenuItem value="January">January</MenuItem>
                <MenuItem value="February">February</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Text Fields */}
          {[
            { label: "Total Working Days", name: "workingDays" },
            { label: "Total HRA", name: "hra" },
            { label: "Travel Allowance", name: "travelAllowance" },
            { label: "Salary Reimbursement", name: "reimbursement" },
            { label: "Others Salary", name: "otherComponents" },
            { label: "Salary Dtax", name: "taxDeduction" },
            { label: "Total Salary", name: "totalSalary" },
            { label: "Basic Salary", name: "basicSalary" },
            { label: "Salary Mediclaim", name: "mediclaim" },
            { label: "Total DA", name: "daAllowance" },
            { label: "Salary CA", name: "conveyanceAllowance" },
            { label: "Salary DPF", name: "providentFund" },
            { label: "Total Deduction", name: "totalDeduction" },
          ].map((field, index) => (
            <Grid item xs={6} key={index}>
              <TextField fullWidth label={field.label} {...register(field.name)} />
            </Grid>
          ))}

          {/* Description */}
          <Grid item xs={12}>
            <TextField fullWidth label="Enter details of Salary" multiline rows={3} {...register("description")} />
          </Grid>

          {/* Upload Salary Slip */}
          <Grid item xs={12}>
            <input type="file" {...register("salarySlip")} />
          </Grid>

          {/* Buttons */}
          <Grid item xs={6}>
            <Button type="submit" fullWidth variant="contained" color="success">
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="error" onClick={() => reset()}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );


















  
};

export default Addsalary;
