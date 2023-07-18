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
import Nav from "../Nav/Nav";
import LOGO1 from "../../assets/images/mainlogo.png";
import LOGO2 from "../../assets/images/background.png";
import Admin from "../Nav/Admin";
const theme = createTheme();

export const AddEvent = () => {
  const navigate = useNavigate();
  const validationScheme = object({
    event_id: string().min(2).required().label("event id"),
    event_name: string().required().label("event name"),
    venue: string().required().label(" venue"),
    starting_date: string().required().label("Starting On"),
    end_date: string().required().label("End On"),
    desc: string().required().label("desc"),
  });

  const { getRootProps, getInputProps } = useDropzone();
  function saveData(val) {
    console.log("hello");
    axios
      .post("http://localhost:4000/auth/event_detail", {
        ...val,
      })
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
          event_id: "",
          event_name: "",
          venue: "",
          starting_date: "",
          end_date: "",
          desc: "",
        }}
        onSubmit={(values) => saveData(values)}
        validationSchema={validationScheme}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched }) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <img src={LOGO2} width="600px" sx={{ marginRight: "20px" }} />
            <Paper elevation={3} sx={{ width: "500px", padding: "30px 10px" }}>
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
                            name="event_id"
                            required
                            fullWidth
                            id="event_id"
                            label="Event Id"
                            // values={values.event_id}
                            onChange={handleChange("event_id")}
                            // onBlur={handleBlur}
                            error={
                              Boolean(touched.event_id) &&
                              Boolean(errors.event_id)
                            }
                            helperText={touched.event_id && errors.event_id}
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            id=" event_name"
                            label="Event Name"
                            name=" event_name"
                            autoComplete="family-name"
                            // value={values. event_name}
                            onChange={handleChange("event_name")}
                            // onBlur={handleBlur}
                            error={
                              Boolean(touched.event_name) &&
                              Boolean(errors.event_name)
                            }
                            helperText={touched.event_name && errors.event_name}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="  venue"
                            label="Venue"
                            name="  venue"
                            autoComplete="  venue"
                            // value={values.  venue}
                            onChange={handleChange("venue")}
                            // onBlur={handleBlur}
                            error={
                              Boolean(touched.venue) && Boolean(errors.venue)
                            }
                            helperText={touched.venue && errors.venue}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputLabel htmlFor="starting_date">
                            Start On?
                          </InputLabel>
                          <TextField
                            fullWidth
                            id="starting_date"
                            type="date"
                            name="starting_date"
                            // value={values.starting_date}
                            onChange={handleChange("starting_date")}
                            // onBlur={handleBlur}
                            error={
                              Boolean(touched.starting_date) &&
                              Boolean(errors.starting_date)
                            }
                            helperText={
                              touched.starting_date && errors.starting_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputLabel htmlFor="end_date">End On?</InputLabel>
                          <TextField
                            fullWidth
                            id="end_date"
                            type="date"
                            name="end_date"
                            // value={values.starting_date}
                            onChange={handleChange("end_date")}
                            // onBlur={handleBlur}
                            error={
                              Boolean(touched.end_date) &&
                              Boolean(errors.end_date)
                            }
                            helperText={touched.end_date && errors.end_date}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="desc"
                            type="text"
                            label="Description"
                            name="desc"
                            multiline
                            rows={4}
                            onChange={handleChange("desc")}
                            // onBlur={handleBlur}
                            error={
                              Boolean(touched.desc) && Boolean(errors.desc)
                            }
                            helperText={touched.desc && errors.desc}
                          />
                        </Grid>
                      </Grid>
                      <Link href="/Admin_dash">
                        <Button
                          onClick={handleSubmit}
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
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
