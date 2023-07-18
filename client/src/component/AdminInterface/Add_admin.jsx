import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Swal from "sweetalert2";
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
import LOGO1 from "../../assets/images/mainlogo.png";
import Nav from "../Nav/Nav";
import Admin from "../Nav/Admin";
const theme = createTheme();

export const Add_admin = () => {
  const navigate = useNavigate();
  const validationScheme = object({
    username: string().required().label("username"),
    name: string().required().label("name"),
    password: string().required().label("password"),
    employee_id: string().required().label("Employee id"),
  });

  const { getRootProps, getInputProps } = useDropzone();
  function saveData(val) {
    console.log("hello");
    axios.post("http://localhost:4000/auth/Add_admin", {
      ...val,
    });
    Swal.fire("TPO Added!", "You clicked the button!")
      .then(() => {
        navigate("/Admin_dash");
        console.log("hello");
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  return (
    <>
      <Admin />
      <Formik
        initialValues={{
          username: "",
          name: "",
          password: "",
          employee_id: "",
        }}
        onSubmit={(values) => saveData(values)}
        validationSchema={validationScheme}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched }) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
              width: "100vw",
            }}
          >
            <Paper elevation={3} sx={{ width: "400px", padding: "50px 30px" }}>
              <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 6,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img src={LOGO1} alt="" width="200px" />
                    <Typography variant="h5" color="primary" sx={{ mt: 4 }}>
                      ADD ADMIN
                    </Typography>
                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      sx={{ mt: 4 }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="family-name"
                            // value={values.username}
                            onChange={handleChange("username")}
                            error={
                              Boolean(touched.username) &&
                              Boolean(errors.username)
                            }
                            helperText={touched.username && errors.username}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            autoComplete="given-name"
                            name="name"
                            required
                            fullWidth
                            label="Name"
                            // values={values.firstName}
                            onChange={handleChange("name")}
                            // onBlur={handleBlur}
                            error={
                              Boolean(touched.name) && Boolean(errors.name)
                            }
                            helperText={touched.name && errors.name}
                            autoFocus
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
                          <TextField
                            required
                            fullWidth
                            id="employee_id"
                            type="text"
                            label="employee id"
                            name="employee_id"
                            // value={values.employee_id}
                            onChange={handleChange("employee_id")}
                            // onBlur={handleBlur}
                            error={
                              Boolean(touched.employee_id) &&
                              Boolean(errors.employee_id)
                            }
                            helperText={
                              touched.employee_id && errors.employee_id
                            }
                          />
                        </Grid>
                      </Grid>
                      <Link href="/">
                        <Button
                          onClick={handleSubmit}
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 4, mb: 2 }}
                        >
                          Submit
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
            </Paper>
          </Box>
        )}
      </Formik>
    </>
  );
};

{
  /* <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Interests
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  multiple
                  limitTags={2}
                  name="interests"
                  options={top100Films}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="limitTags"
                      placeholder="Favorites"
                    />
                  )}
                  sx={{ width: "400px" }}
                />
              </Grid> */
}
