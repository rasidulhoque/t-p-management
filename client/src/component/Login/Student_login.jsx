import {
  Avatar,
  Box,
  Button,
  Chip,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Hidden } from "@mui/material";
import Nav from "../Nav/Nav";
import {
  DepartmentContext,
  DepartmentContextProvider,
  UsernameContext,
} from "../StudentProfile/contexts/StepperContext";
import PersonIcon from "@mui/icons-material/Person";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import LockIcon from "@mui/icons-material/Lock";
import { Formik } from "formik";
import { object, ref, string, number } from "yup";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LOGO1 from "../../assets/images/adminLogin1.png";
import axios from "axios";
import { textAlign } from "@mui/system";
import mainLOGO from "../../assets/images/mainlogo.png";
import swal from "sweetalert";

export const Student_login = () => {
  const { setUsername } = useContext(UsernameContext);
  const { setDepartment } = useContext(DepartmentContext);
  const navigate = useNavigate();
  const validationScheme = object({
    username: string().required().label("Username"),
    password: string().required().label("Password"),
  });
  const paperStyle = {
    padding: "40px 20px",
    minHeight: "440px",
    width: "100%",
    maxWidth: "100%",
    margin: "20px auto",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  };

  const login = (val) => {
    axios
      .post(`http://localhost:4000/auth/stu_login`, {
        ...val,
      })
      .then((res) => {
        console.log(res.data.username);
        setUsername(res.data.username);
        setDepartment(res.data.department);
        localStorage.setItem('username',res.data.username);
        localStorage.setItem('department',res.data.department);
        swal({
          title: "Login Successful!",
          text: " Please set your Profile!",
          icon: "success",
        });
        navigate("/Stu_dash");
      })
      .catch((err) => window.alert(err));
  };

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values) => login(values)}
        validationSchema={validationScheme}
      >
        {({ handleChange, handleSubmit, errors, touched }) => (
          <Grid
            container
            padding="4%"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CssBaseline />
            <Grid item>
              <Hidden only={["xs"]}>
                <img src={LOGO1} style={{ width: "500px" }} />
              </Hidden>
            </Grid>
            <Grid item>
              <Paper
                elevation={5}
                style={paperStyle}
                border="2px solid #ADD8E6"
                border-radius="10px"
                box-shadow="0 0 5px #ADD8E6"
              >
                <img src={mainLOGO} alt="" width="250px" />

                <Typography
                  component="h1"
                  variant="h4"
                  align="center"
                  gutterBottom
                  sx={{
                    color: "#3f51b5",
                    fontWeight: "bold",
                    marginTop: "3rem",
                    textShadow: "1px 1px #b3b3b3",
                    letterSpacing: "0.05em",
                    fontFamily: "'Roboto', sans-serif",
                    textTransform: "uppercase",
                  }}
                >
                  Student Login
                </Typography>

                <Grid align="center"></Grid>
                <Box sx={{ marginTop: "30px" }}>
                  <TextField
                    onChange={handleChange("username")}
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    error={
                      Boolean(touched.username) && Boolean(errors.username)
                    }
                    helperText={touched.username && errors.username}
                  />
                  <TextField
                    onChange={handleChange("password")}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    sx={{ marginTop: "30px" }}
                    fullWidth
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                  />
                </Box>
                <Box
                  sx={{
                    textAlign: "center",
                    padding: "30px",
                    color: "#663737",
                  }}
                >
                  <Typography variant="p" sx={{ fontSize: "14px" }}>
                    Dont have an account?{" "}
                    <Link to="/stu_reg" color="inherit">
                      Register
                    </Link>
                  </Typography>
                </Box>
                <Button
                  startIcon={<LockIcon />}
                  variant="contained"
                  sx={{ backgroundColor: "#6600cc" }}
                  onClick={handleSubmit}
                  fullWidth
                >
                  LOGIN
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Formik>
    </>
  );
};

export default Student_login;
