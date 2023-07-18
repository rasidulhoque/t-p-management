import * as React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import Nav_company from "../Nav/Nav_company";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material";
import {
  CompanyAddressContext,
  CompanyNameContext,
} from "../StudentProfile/contexts/StepperContext";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { object, ref, string, number } from "yup";
export default function JobPost2(props) {
  const navigate = useNavigate();
  const { companyName, setCompanyName } = useContext(CompanyNameContext);
  const { companyAddress, setCompanyAddress } = useContext(
    CompanyAddressContext
  );
  console.log(companyName);
  const [formData, setFormData] = useState({
    job_name: "",
    job_type: "",
    perks: "",
    eligibility: "",
    department: "",
    company_name: "",
    deadline: "",
    duration: "",
    description: "",
    job_location: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/auth/get_field_from_jobPost2/${props.job_id}`)
      .then((res) => {
        setFormData(res.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.job_id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:4000/auth/update_job_post/${props.job_id}`,
        formData
      )
      .then((res) => {
        console.log(res.data.message);
        // do something else, such as redirect to the job post page
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <React.Fragment>
          <Paper elevation={6} sx={{ marginRight: "5%", marginLeft: "5%" }}>
            <Box sx={{ padding: 5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                  <InputLabel
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: 700,
                    }}
                  >
                    Job Title
                  </InputLabel>
                </Grid>

                <Grid item xs={12} sm={10}>
                  <TextField
                    required
                    name="job_name"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    variant="outlined"
                    value={formData.job_name}
                    onChange={handleChange}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <InputLabel
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: 700,
                    }}
                  >
                    Eligibility
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    name="eligibility"
                    multiline
                    fullWidth
                    rows={4}
                    value={formData.eligibility}
                    onChange={handleChange}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <InputLabel
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: 700,
                    }}
                  >
                    Description
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    name="description"
                    multiline
                    fullWidth
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                  ></TextField>
                </Grid>

                <Grid item xs={12} sm={2}>
                  <InputLabel
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: 700,
                    }}
                  >
                    Salary & Perks
                  </InputLabel>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    name="perks"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    variant="outlined"
                    value={formData.perks}
                    onChange={handleChange}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <InputLabel
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: 700,
                    }}
                  >
                    Posted By
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      border: "1px solid black",
                      p: 1,
                      cursor: "not-allowed",
                    }}
                  >
                    <Typography
                      required
                      name="company_name"
                      label="Posted By"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                    >
                      {companyName}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <InputLabel
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: 700,
                    }}
                  >
                    Address
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      border: "1px solid black",
                      p: 1,
                      cursor: "not-allowed",
                    }}
                  >
                    <Typography
                      required
                      name="company_address"
                      label="Posted By"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                    >
                      {companyAddress}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={2}>
                  <InputLabel
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: 700,
                    }}
                  >
                    Duration
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="duration"
                    label="Duration"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    variant="outlined"
                    value={formData.duration}
                    onChange={handleChange}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <InputLabel
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: 700,
                    }}
                  >
                    Job Location
                  </InputLabel>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    name="job_location"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    variant="outlined"
                    value={formData.job_location}
                    onChange={handleChange}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <InputLabel
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: 700,
                    }}
                  >
                    Application Deadline
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    name="deadline"
                    fullWidth
                    type="date"
                    size="small"
                    autoComplete="off"
                    variant="outlined"
                    value={formData.deadline}
                    onChange={handleChange}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6} />
                <Grid item xs={12} sm={5} />
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="contained"
                    sx={{ color: "#ff781f" }}
                    type="submit"
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item xs={12} sm={5} />
              </Grid>
            </Box>
          </Paper>
        </React.Fragment>
      </form>
    </>
  );
}
