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
import { InputAdornment } from "@mui/material";
import { Autocomplete } from "@mui/material";
import {
  CompanyAddressContext,
  CompanyIdContext,
  CompanyNameContext,
} from "../StudentProfile/contexts/StepperContext";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { object, ref, string, number } from "yup";
export default function JobPost() {
  const [type, setType] = React.useState("");
  const [type2, setType2] = React.useState("");
  const [jobIdExists, setJobIdExists] = React.useState(false);
  const navigate = useNavigate();
  const { companyName, setCompanyName } = useContext(CompanyNameContext);
  const { id, setId}= useContext(CompanyIdContext);
  const { companyAddress, setCompanyAddress } = useContext(
    CompanyAddressContext
  );
  console.log(companyName);
  const handleChange1 = (event) => {
    setType(event.target.value);
  };
  const handleChange2 = (event) => {
    setType2(event.target.value);
  };
  const categories = ["Part Time", "Full Time", "Internship"];
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/auth/get_departments")
      .then((response) => {
        const departments = response.data;
        setDepartments(departments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const validationScheme = object({
    job_id: string().required().label("job_id"),
    job_name: string().required().label("name"),
    eligibility: string().required().label("eligibility"),
    // department: string().required().label("department"),
    // job_type: string().required().label("type"),
    perks: string().required().label("perks"),
    duration: string().required().label("duration"),
    deadline: string().required().label("deadline"),
  });
  function saveData(val) {
    console.log("hello");
    axios
      .post("http://localhost:4000/auth/job_post", {
        ...val,
        id:id,
        job_type: type,
        department: type2,
        company_name: companyName,
        company_address: companyAddress,
      })
      .then(() => {
        navigate("/CompanyDash");
      })
      .catch((error) => {
        // handle error
        if (
          error.response &&
          error.response.data.error === "Job ID already exists"
        ) {
          setJobIdExists(true); // Set job_id validation status to true if the error response indicates job_id already exists
        }
        console.log("helloM");
        console.log(error);
      });
  }

  return (
    <>
      <Nav_company />
      <Formik
        initialValues={{
          job_id: "",
          job_name: "",
          eligibility: "",
          department: "",
          job_type: "",
          perks: "",
          duration: "",
          deadline: "",
        }}
        onSubmit={(values) => saveData(values)}
        validationSchema={validationScheme}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched }) => (
          <React.Fragment>
            <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
              <Box sx={{ padding: 5 }}>
                {/* <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
              Microsoft
            </Typography> */}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: 700,
                      }}
                    >
                      Job Id
                    </InputLabel>
                  </Grid>

                  <Grid item xs={12} sm={10}>
                    <TextField
                      fullWidth
                      id="job_id"
                      name="job_id"
                      label="Job Id"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.job_id && errors.job_id}
                      helperText={touched.job_id && errors.job_id}
                      // Added condition to display job_id existence message
                      InputProps={{
                        endAdornment: jobIdExists && (
                          <InputAdornment position="end">
                            <Typography variant="caption" color="error">
                              Job ID already exists
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
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
                      label="job Title"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                      onChange={handleChange("job_name")}
                      error={
                        Boolean(touched.job_name) && Boolean(errors.job_name)
                      }
                      helperText={touched.job_name && errors.job_name}
                    />
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
                      label="Eligibility"
                      name="eligibility"
                      multiline
                      fullWidth
                      rows={4}
                      onChange={handleChange("eligibility")}
                      error={
                        Boolean(touched.eligibility) &&
                        Boolean(errors.eligibility)
                      }
                      helperText={touched.eligibility && errors.eligibility}
                    />
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
                      label="** 500 words or less"
                      name="description"
                      multiline
                      fullWidth
                      rows={6}
                      onChange={handleChange("description")}
                      error={
                        Boolean(touched.description) &&
                        Boolean(errors.description)
                      }
                      helperText={touched.description && errors.description}
                    />
                  </Grid>

                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: 700,
                      }}
                    >
                      Department
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      fullWidth
                      size="small"
                      onChange={handleChange("department")}
                      // error={
                      //   Boolean(touched.department) &&
                      //   Boolean(errors.department)
                      // }
                      // helperText={touched.department && errors.department}
                    >
                      <InputLabel>Department</InputLabel>
                      <Select
                        value={type2}
                        name="department"
                        label="Department"
                        onChange={handleChange2}
                      >
                        {departments.map((item) => (
                          <MenuItem value={item.department}>
                            {item.department}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: 700,
                      }}
                    >
                      Type
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      fullWidth
                      size="small"
                      onChange={handleChange("job_type")}
                      error={
                        Boolean(touched.job_type) && Boolean(errors.job_type)
                      }
                      helperText={touched.job_type && errors.job_type}
                    >
                      <InputLabel>Type</InputLabel>
                      <Select
                        value={type}
                        name="job_type"
                        label="Type"
                        onChange={handleChange1}
                      >
                        {categories.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                      label="Salary & Perks"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                      onChange={handleChange("perks")}
                      error={Boolean(touched.perks) && Boolean(errors.perks)}
                      helperText={touched.perks && errors.perks}
                    />
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
                        onChange={handleChange("company_name")}
                        error={
                          Boolean(touched.company_name) &&
                          Boolean(errors.company_name)
                        }
                        helperText={touched.company_name && errors.company_name}
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
                        onChange={handleChange("company_address")}
                        error={
                          Boolean(touched.company_address) &&
                          Boolean(errors.company_address)
                        }
                        helperText={
                          touched.company_address && errors.company_address
                        }
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
                      onChange={handleChange("duration")}
                      error={
                        Boolean(touched.duration) && Boolean(errors.duration)
                      }
                      helperText={touched.duration && errors.duration}
                    />
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
                      label="Job Location"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                      onChange={handleChange("job_location")}
                      error={
                        Boolean(touched.job_location) &&
                        Boolean(errors.job_location)
                      }
                      helperText={touched.job_location && errors.job_location}
                    />
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
                      onChange={handleChange("deadline")}
                      error={
                        Boolean(touched.deadline) && Boolean(errors.deadline)
                      }
                      helperText={touched.deadline && errors.deadline}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} />
                  <Grid item xs={12} sm={5} />
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      sx={{ color: "#ff781f" }}
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={5} />
                </Grid>
              </Box>
            </Paper>
          </React.Fragment>
        )}
      </Formik>
    </>
  );
}
