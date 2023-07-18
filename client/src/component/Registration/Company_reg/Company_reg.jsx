import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { useDropzone } from "react-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import InputLabel from "@mui/material/InputLabel";
import { Formik, useFormik } from "formik";
import { object, ref, string, number } from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../../Nav/Nav";
import LOGO1 from "../../../assets/images/mainlogo.png";
import LOGO2 from "../../../assets/images/background.png";
import Swal from "sweetalert2";
const theme = createTheme();

export const Company_reg = () => {
  const navigate = useNavigate();
  const validationScheme = object({
    username: string().min(2).required().label("Username"),
    company_name: string().min(2).required().label("Company name"),
    company_address: string().required().label("Company Address"),
    email: string().required().label("Email").email(),
    ph_no: string().required().label("phone number"),
    zip_code: string().required().label("Zip Code"),
    password: string().required().label("password"),
  });

  const { getRootProps, getInputProps } = useDropzone();
  const [company_licence, setcompany_licence] = React.useState(null);
  const [logo, setLogo] = React.useState(null);
  const handleLicenceChange = (event) => {
    setcompany_licence(event.target.files[0]);
    console.log(event.target.files);
  };
  const handleLogoChange = (event) => {
    setLogo(event.target.files[0]);
    console.log(event.target.files);
  };
  const saveData = async (val) => {
    console.log("hello");
    const formData = new FormData();
    formData.append("username", val.username);
    formData.append("company_name", val.company_name);
    formData.append("company_address", val.company_address);
    formData.append("email", val.email);
    formData.append("ph_no", val.ph_no);
    formData.append("zip_code", val.zip_code);
    formData.append("company_licence", company_licence);
    formData.append("logo", logo);
    formData.append("password", val.password);

    try {
      await axios
        .post(
          "http://localhost:4000/company_register",
          formData
          // { headers: headers }
        )
        Swal.fire({
          title: "<span style='font-size: 20px; color: black;'>Your credentials have been submitted for examination and verification by the admin. Once approved, you will be able to login to the system.</span>",
          });
          navigate("/Homepage");
    } catch (error) {
      // handle error
      console.log(error);
    }
  };

  return (
    <>
      {/* <Nav /> */}
      <Formik
        initialValues={{
          username: "",
          company_name: "",
          company_address: "",
          est: "",
          email: "",
          ph_no: "",
          zip_code: "",
          company_licence: "",
          password: "",
        }}
        onSubmit={(values) => saveData(values)}
        validationSchema={validationScheme}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched }) => (
          <Box sx={{ padding: "100px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "80px",
                alignItems: "center",
                height: "100vh",
                width: "80vw",
                // padding:"100px"
              }}
            >
              <img src={LOGO2} width="600px" sx={{ marginRight: "20px" }} />
              <Paper
                elevation={12}
                sx={{
                  width: "600px",
                  padding: "40px 10px",
                  borderRadius: "20px",
                }}
              >
                <ThemeProvider theme={theme}>
                  <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                      sx={{
                        marginTop: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign up
                    </Typography> */}
                      <img src={LOGO1} width="200px" />
                      <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              autoComplete="given-name"
                              name="username"
                              required
                              fullWidth
                              id="username"
                              label="Username"
                              // values={values.username}
                              onChange={handleChange("username")}
                              // onBlur={handleBlur}
                              error={
                                Boolean(touched.username) &&
                                Boolean(errors.username)
                              }
                              helperText={touched.username && errors.username}
                              autoFocus
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              id="company_name"
                              label="Company Name"
                              name="company_name"
                              autoComplete="family-name"
                              // value={values.company_name}
                              onChange={handleChange("company_name")}
                              // onBlur={handleBlur}
                              error={
                                Boolean(touched.company_name) &&
                                Boolean(errors.company_name)
                              }
                              helperText={
                                touched.company_name && errors.company_name
                              }
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              id="company_address"
                              type="text"
                              label="Full Address"
                              name="company_address"
                              // value={values.company_address}
                              onChange={handleChange("company_address")}
                              // onBlur={handleBlur}
                              error={
                                Boolean(touched.company_address) &&
                                Boolean(errors.company_address)
                              }
                              helperText={
                                touched.company_address &&
                                errors.company_address
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              autoComplete="email"
                              // value={values.email}
                              onChange={handleChange("email")}
                              // onBlur={handleBlur}
                              error={
                                Boolean(touched.email) && Boolean(errors.email)
                              }
                              helperText={touched.email && errors.email}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              id="est"
                              type="text"
                              label="Established"
                              name="est"
                              // value={values.ph_no}
                              onChange={handleChange("est")}
                              // onBlur={handleBlur}
                              error={
                                Boolean(touched.est) && Boolean(errors.est)
                              }
                              helperText={touched.est && errors.est}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              id="ph_no"
                              type="text"
                              label="Phone Number"
                              name="ph_no"
                              // value={values.ph_no}
                              onChange={handleChange("ph_no")}
                              // onBlur={handleBlur}
                              error={
                                Boolean(touched.ph_no) && Boolean(errors.ph_no)
                              }
                              helperText={touched.ph_no && errors.ph_no}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              id="zip_code"
                              type="text"
                              label="Zip code"
                              name="zip_code"
                              // value={values.zip_code}
                              onChange={handleChange("zip_code")}
                              // onBlur={handleBlur}
                              error={
                                Boolean(touched.zip_code) &&
                                Boolean(errors.zip_code)
                              }
                              helperText={touched.zip_code && errors.zip_code}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel htmlFor="company_licence">
                              Company Licence
                            </InputLabel>
                            <TextField
                              required
                              fullWidth
                              id="company_licence"
                              name="company_licence"
                              type="file"
                              onChange={handleLicenceChange}

                              // onChange={handleChange("company_licence")}
                              // error={
                              //   Boolean(touched.company_licence) &&
                              //   Boolean(errors.company_licence)
                              // }
                              // helperText={
                              //   touched.company_licence &&
                              //   errors.company_licence
                              // }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel htmlFor="company_licence">
                              Company Logo
                            </InputLabel>
                            <TextField
                              required
                              fullWidth
                              id="logo"
                              name="logo"
                              type="file"
                              onChange={handleLogoChange}

                              // onChange={handleChange("company_licence")}
                              // error={
                              //   Boolean(touched.company_licence) &&
                              //   Boolean(errors.company_licence)
                              // }
                              // helperText={
                              //   touched.company_licence &&
                              //   errors.company_licence
                              // }
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              autoComplete="new-password"
                              // value={values.password}
                              onChange={handleChange("password")}
                              // onBlur={handleBlur}
                              error={
                                Boolean(touched.password) &&
                                Boolean(errors.password)
                              }
                              helperText={touched.password && errors.password}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  value="allowExtraEmails"
                                  color="primary"
                                />
                              }
                              label="I want to receive approval message via email."
                            />
                          </Grid>
                        </Grid>
                        <Link href="/Login">
                          <Button
                            onClick={handleSubmit}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            Sign Up
                          </Button>
                        </Link>
                        <Grid container justifyContent="flex-end">
                          <Grid item>
                            <Link href="/Admin_login" variant="body2">
                              Already have an account? Sign in
                            </Link>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Container>
                </ThemeProvider>
              </Paper>
            </Box>
          </Box>
        )}
      </Formik>
    </>
  );
};
