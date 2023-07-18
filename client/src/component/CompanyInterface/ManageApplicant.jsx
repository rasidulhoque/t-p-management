import React, { useState } from "react";
import { Typography, Grid } from "@mui/material";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Nav_company from "../Nav/Nav_company";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export const ManageApplicant = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    medialinks: "",
    institute: "",
    dept: "",
    course: "",
    sem: "",
    marks: "",
    reg_no: "",
    marksheet: null,
    prevInstitute: "",
    prevDept: "",
    prevDegree: "",
    prevMarks: "",
    prevReg_no: "",
    prevMarksheet: null,
    cerInstitute: "",
    cerCourseName: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.files[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Nav_company />
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          border: "3px solid black",
          borderRadius: "4px",
          padding: "20px",
          marginBottom: "50px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography
              border="1px solid #ccc"
              required
              id="name"
              name="name"
              label="Name"
              onChange={handleChange}
              fullWidth
            > Name:{formData.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              border="1px solid #ccc"
              required
              id="email"
              name="email"
              label="Email"
              onChange={handleChange}
              fullWidth
            >Email:{formData.email} </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              border="1px solid #ccc"
              required
              id="address"
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
            > Address:</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              border="1px solid #ccc"
              id="institute"
              name="institute"
              label="Institute"
              onChange={handleChange}
              fullWidth
            > Institute:{formData.institute}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              border="1px solid #ccc"
              id="dept"
              name="dept"
              label="Department"
              onChange={handleChange}
              fullWidth
            >Department:{formData.dept}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              border="1px solid #ccc"
              id="course"
              name="course"
              label="Course"
              onChange={handleChange}
              fullWidth
            >Course:{formData.course}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              border="1px solid #ccc"
              id="sem"
              name="sem"
              label="Semester"
              onChange={handleChange}
              fullWidth
            >Semester:{formData.sem}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              border="1px solid #ccc"
              id="marks"
              name="marks"
              label="Marks"
              onChange={handleChange}
              fullWidth
            >Marks:{formData.marks}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              border="1px solid #ccc"
              id="reg_no"
              name="reg_no"
              label="Registration No."
              onChange={handleChange}
              fullWidth
            >Registration No:{formData.reg_no}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              border="1px solid #ccc"
              name="marksheet"
              label="Selected file"
              onChange={handleChange}
              fullWidth
            > Marsheet:{formData.marksheet}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              border="1px solid #ccc"
              id="cerInstitute"
              name="cerInstitute"
              label="Certification Institute"
              onChange={handleChange}
              fullWidth
            >Certification Institute:{formData.cerInstitute}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              border="1px solid #ccc"
              id="cerCourseName"
              name="cerCourseName"
              label="Certification Course Name"
              onChange={handleChange}
              fullWidth
            >Certification Course Name:{formData.cerCourseName}</Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "24px",
              }}
            >
              <Button
                variant="contained"
                style={{ backgroundColor: "green", color: "white" }}
                startIcon={<CheckIcon />}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "red", color: "white" }}
                startIcon={<ClearIcon />}
              >
                Reject
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
