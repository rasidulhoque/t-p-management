import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
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
const theme = createTheme();

export const Stu_reg = () => {
  const navigate = useNavigate();
  const validationScheme = object({
    firstName: string().min(2).required().label("first name"),
    lastName: string().min(2).required().label("Last name"),
    username: string().min(4).required().label("Username"),
    ph_no: string().required("Phone number is Required").length(10,"Phone number must be exactly 10 digits").label("phone number"),
    email: string().required().label("Email").email(),
    course: string().required().label("Course"),
    reg_no: string().required().label("University registration number"),
    password: string().required().label("password"),
  });

  const { getRootProps, getInputProps } = useDropzone();
  const [reg_card, setReg_card] = React.useState(null);
  const [resume, setResume] = React.useState(null);
  const [profilePic, setProfilePic] = React.useState(null);
  const handleRegCardChange = (event) => {
    setReg_card(event.target.files[0]);
  };

  const handleResumeChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleProfilePicChange = (event) => {
    setProfilePic(event.target.files[0]);
  };
  const saveData = async (val) => {
    console.log("hello");
    const formData = new FormData();
    formData.append("firstName", val.firstName);
    formData.append("lastName", val.lastName);
    formData.append("username", val.username);
    formData.append("ph_no", val.ph_no);
    formData.append("email", val.email);
    formData.append("course", val.course);
    formData.append("reg_no", val.reg_no);
    formData.append("password", val.password);
    formData.append("reg_card", reg_card);
    formData.append("resume", resume);
    formData.append("profilePic", profilePic);
    try {
      await axios.post("http://localhost:4000/stu_register", formData);
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
          firstName: "",
          lastName: "",
          username: "",
          ph_no: "",
          email: "",
          course: "",
          reg_no: "",
          password: "",
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
              marginTop:"90px"
            }}
          >
            <img src={LOGO2} width="600px" sx={{ marginRight: "100px" }} />
            <Paper elevation={24} sx={{ width: "600px", margin:"100px"}}>
              <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm">
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 5,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
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
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            onChange={handleChange("firstName")}
                            error={
                              Boolean(touched.firstName) &&
                              Boolean(errors.firstName)
                            }
                            helperText={touched.firstName && errors.firstName}
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            onChange={handleChange("lastName")}
                            error={
                              Boolean(touched.lastName) &&
                              Boolean(errors.lastName)
                            }
                            helperText={touched.lastName && errors.lastName}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            autoComplete="username"
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
                            required
                            fullWidth
                            id="ph_no"
                            type="text"
                            label="Phone Number"
                            name="ph_no"
                            onChange={handleChange("ph_no")}
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
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleChange("email")}
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
                            id="course"
                            type="text"
                            label="Course Persuing"
                            name="course"
                            onChange={handleChange("course")}
                            error={
                              Boolean(touched.course) && Boolean(errors.course)
                            }
                            helperText={touched.course && errors.course}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="reg_no"
                            type="text"
                            label="Registration Number"
                            name="reg_no"
                            onChange={handleChange("reg_no")}
                            error={
                              Boolean(touched.reg_no) && Boolean(errors.reg_no)
                            }
                            helperText={touched.reg_no && errors.reg_no}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputLabel htmlFor="reg_card">
                            University Registration Card
                          </InputLabel>
                          <TextField
                            fullWidth
                            id="reg_card"
                            type="file"
                            name="reg_card"
                            onChange={handleRegCardChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputLabel htmlFor="reg_card">
                            Upload resume
                          </InputLabel>
                          <TextField
                            fullWidth
                            id="resume"
                            type="file"
                            name="resume"
                            onChange={handleResumeChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputLabel htmlFor="reg_card">
                            Upload Profile Picture
                          </InputLabel>
                          <TextField
                            fullWidth
                            id="profilePic"
                            type="file"
                            name="profilePic"
                            onChange={handleProfilePicChange}
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
                            onChange={handleChange("password")}
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
        )}
      </Formik>
    </>
  );
};

// import {
//   Avatar,
//   Box,
//   Button,
//   Checkbox,
//   CssBaseline,
//   Grid,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { FormControlLabel } from "@mui/material";
// import { InputLabel } from "@mui/material";
// import { CheckboxClasses } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";

// import { Link } from "react-router-dom";
// import GoogleIcon from "@mui/icons-material/Google";

// import React, { useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { Formik } from "formik";
// import { object, ref, string, number } from "yup";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export const Stu_reg = () =>  {
//   const navigate = useNavigate();
//   const validationScheme = object({
//     firstName: string().min(2).required().label("first name"),
//     lastName: string().min(2).required().label("Last name"),
//     username: string().min(4).required().label("Username"),
//     ph_no: number().min(10).required().label("phone number"),
//     email: string().required().label("Email"),
//     couse: string().required().label("Course"),
//     reg_no: string().required().label("University registration number"),
//     reg_card: string().required().label("Uiversity registratin card"),
//     password:string().required().label("password")
//   });

//   const onDrop = useCallback((acceptedFiles) => {}, []);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//   });
//   const dropStyle = {
//     display: "flex",
//     justifyContent: "center",

//     alignItems: "center",
//     border: "1px dashed black",
//     marginTop: "10px",
//   };

//   const paperStyle = {
//     padding: 20,
//     minHeight: "440px",
//     width: 480,
//     margin: "20px auto",
//     borderRadius: "20px",
//     cursor: "pointer",
//   };

//   const saveData = (val) => {
//     axios
//       .post(`http://localhost:4000/auth/stu_register`, {
//         ...val,
//       })
//       .then(() => {
//         navigate("/login");
//       })
//       .catch((err) => window.alert(err));
//   };
//   return (
//     <>
//       <Formik
//         initialValues={{
//           username: "",
//           email: "",
//           password: "",
//           confirm_password: "",
//           phoneNumber: "",
//         }}
//         onSubmit={(values) => saveData(values)}
//         validationSchema={validationScheme}
//       >
//         {({ handleChange, handleSubmit, errors, touched }) => (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               minHeight: "100vh",
//               backgroundImage: `url(${
//                 process.env.PUBLIC_URL + "/assets/homeBg.jpg"
//               })`,
//               backgroundSize: "cover",
//             }}
//           >
//             <CssBaseline />
//             <Paper elevation={5} style={paperStyle}>
//               <Grid align="center">
//                 <Link to="/">
//                   <img src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fstudying%2F&psig=AOvVaw1S61PeBXem5iV7h3LomOG5&ust=1677325182149000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCND4j6-Jrv0CFQAAAAAdAAAAABAE"} alt="" height="70px" width="70px" />
//                 </Link>
//                 <Typography variant="h5" sx={{ marginTop: "2px" }}>
//                   Register
//                 </Typography>
//               </Grid>
//               <Box
//                     sx={{
//                       marginTop: 8,
//                       display: 'flex',
//                       flexDirection: 'column',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                     </Avatar>
//                     <Typography component="h1" variant="h5">
//                       Sign up
//                     </Typography>
//                     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                       <Grid container spacing={2}>
//                         <Grid item xs={12} sm={6}>
//                           <TextField
//                             autoComplete="given-name"
//                             name="firstName"
//                             required
//                             fullWidth
//                             id="firstName"
//                             label="First Name"
//                             // values={values.firstName}
//                             onChange={handleChange("firstName")}
//                             // onBlur={handleBlur}
//                             error={Boolean(touched.firstName) && Boolean(errors.firstName)}
//                             helperText={touched.firstName && errors.firstName}
//                             autoFocus
//                           />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                           <TextField
//                             required
//                             fullWidth
//                             id="lastName"
//                             label="Last Name"
//                             name="lastName"
//                             autoComplete="family-name"
//                             // value={values.lastName}
//                             onChange={handleChange("lastName")}
//                             // onBlur={handleBlur}
//                             error={Boolean(touched.lastName) && Boolean(errors.lastName)}
//                             helperText={touched.lastName && errors.lastName}
//                           />
//                         </Grid>
//                         <Grid item xs={12}>
//                           <TextField
//                             required
//                             fullWidth
//                             id="username"
//                             label="User Name"
//                             name="username"
//                             autoComplete="username"
//                             // value={values.username}
//                             onChange={handleChange("username")}
//                             // onBlur={handleBlur}
//                             error={Boolean(touched.username) && Boolean(errors.username)}
//                             helperText={touched.username && errors.username}
//                           />
//                         </Grid>
//                         <Grid item xs={12}>
//                           <TextField
//                             required
//                             fullWidth
//                             id="ph_no"
//                             type="text"
//                             label="Phone Number"
//                             name="ph_no"
//                             // value={values.ph_no}
//                             onChange={handleChange("ph_no")}
//                             // onBlur={handleBlur}
//                             error={Boolean(touched.ph_no) && Boolean(errors.ph_no)}
//                             helperText={touched.ph_no && errors.ph_no}
//                           />
//                         </Grid>
//                         <Grid item xs={12}>
//                           <TextField
//                             required
//                             fullWidth
//                             id="email"
//                             label="Email Address"
//                             name="email"
//                             autoComplete="email"
//                             // value={values.email}
//                             onChange={handleChange("email")}
//                             // onBlur={handleBlur}
//                             error={Boolean(touched.email) && Boolean(errors.email)}
//                             helperText={touched.email && errors.email}
//                           />
//                         </Grid>
//                         <Grid item xs={12}>
//                           <TextField
//                             required
//                             fullWidth
//                             id="course"
//                             type="text"
//                             label="Course Persuing"
//                             name="course"
//                             // value={values.course}
//                             onChange={handleChange("course")}
//                             // onBlur={handleBlur}
//                             error={Boolean(touched.course) && Boolean(errors.course)}
//                             helperText={touched.course && errors.course}
//                           />
//                         </Grid>
//                         <Grid item xs={12}>
//                           <TextField
//                             required
//                             fullWidth
//                             id="reg_no"
//                             type="text"
//                             label="Registration Number"
//                             name="reg_no"
//                             // value={values.reg_no}
//                             onChange={handleChange("reg_no")}
//                             // onBlur={handleBlur}
//                             error={Boolean(touched.reg_no) && Boolean(errors.reg_no)}
//                             helperText={touched.reg_no && errors.reg_no}
//                           />
//                         </Grid>
//                         <Grid item xs={12}>
//                           <InputLabel htmlFor="reg_card">
//                             University Registration Card
//                           </InputLabel>
//                           <TextField
//                             required
//                             fullWidth
//                             id="reg_card"
//                             type="file"
//                             name="reg_card"
//                             // value={values.reg_card}
//                             onChange={handleChange("reg_card")}
//                             // onBlur={handleBlur}
//                             error={Boolean(touched.reg_card) && Boolean(errors.reg_card)}
//                             helperText={touched.reg_card && errors.reg_card}
//                           />
//                         </Grid>

//                         <Grid item xs={12}>
//                           <TextField
//                             required
//                             fullWidth
//                             name="password"
//                             label="Password"
//                             type="password"
//                             id="password"
//                             autoComplete="new-password"
//                             // value={values.password}
//                             onChange={handleChange("password")}
//                             // onBlur={handleBlur}
//                             error={Boolean(touched.password) && Boolean(errors.password)}
//                             helperText={touched.password && errors.password}
//                           />
//                         </Grid>
//                         <Grid item xs={12}>
//                           <FormControlLabel
//                             control={<Checkbox value="allowExtraEmails" color="primary" />}
//                             label="I want to receive approval message via email."
//                           />
//                         </Grid>
//                       </Grid>

//                       <Button
//                         onClick={handleSubmit}
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         sx={{ mt: 3, mb: 2 }}
//                       >
//                         Sign Up
//                       </Button>
//                       <Grid container justifyContent="flex-end">
//                         <Grid item>
//                           <Link href='/Login' variant="body2">
//                             Already have an account? Sign in
//                           </Link>
//                         </Grid>
//                       </Grid>
//                     </Box>
//                   </Box>

//               <Box
//                 sx={{
//                   textAlign: "center",
//                   marginTop: "10px",
//                   color: "#663737",
//                 }}
//               >
//                 <Typography variant="p" sx={{ fontSize: "14px" }}>
//                   Already have an account?{" "}
//                   <Link to="/login" color="inherit">
//                     Login
//                   </Link>
//                 </Typography>
//                 <Button
//                   startIcon={<PersonIcon />}
//                   variant="contained"
//                   sx={{ marginTop: "20px" }}
//                   color="success"
//                   onClick={handleSubmit}
//                   fullWidth
//                 >
//                   REGISTER
//                 </Button>
//                 <Typography variant="h6" sx={{ marginTop: "10px" }}>
//                   OR
//                 </Typography>
//                 <Button
//                   startIcon={<GoogleIcon />}
//                   variant="contained"
//                   sx={{ marginTop: "10px" }}
//                   fullWidth
//                 >
//                   Sign Up with Google
//                 </Button>
//               </Box>
//             </Paper>
//           </Box>
//         )}
//       </Formik>
//     </>
//   );
// };

// export default Stu_reg;
