import { Button, Card } from "@mui/material";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import { Approve_Student } from "./Approve_Student";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Person2Icon from "@mui/icons-material/Person2";
import PushPinIcon from "@mui/icons-material/PushPin";
import { EventCalender } from "./EventCalender";
import Marquee from "react-fast-marquee";
import { AddEvent } from "./AddEvent";
import Admin from "../Nav/Admin";
import {
  AdminProfilePictureContext,
  UsernameContext,
} from "../StudentProfile/contexts/StepperContext";
import { StudentChart } from "./Charts/StudentChart";
import { LineChart } from "./Charts/LineChart";
import { StudentPlaced } from "./StudentPlaced";

export const Admin_dash = () => {
  const Img = styled("img")({
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "10px",
  });
  const [totalStudents, setTotalStudents] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const { setUsername } = useContext(UsernameContext);
  const { setPhoto } = useContext(AdminProfilePictureContext);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    setPhoto(localStorage.getItem("photo"));
    console.log("refresh");
    axios
      .get("http://localhost:4000/auth/getTotalStudents")
      .then((response) => {
        setTotalStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/auth/countAdmins")
      .then((response) => {
        setAdminCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/auth/countcompany")
      .then((response) => {
        setCompanyCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Admin />
      <Box sx={{ marginLeft: { md: "250px" } }}>
        <Box sx={{ width: "100%", height: "auto" }}>
          <Grid
            sx={{ paddingBottom: "40px" }}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  margin: "auto",
                  maxWidth: 400,
                  flexGrow: 1,
                  borderRadius: "10px",
                  backgroundColor: "#f7f7f7",
                  backgroundImage:
                  "linear-gradient(rgb(78, 115, 223) 10%, rgb(34, 74, 190) 100%)",
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <PushPinIcon
                        sx={{ width: 80, height: 80, color: "black" }}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs>
                    <Link
                      to="/ApprovedStudent "
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        gutterBottom
                        component="big"
                        display="flex"
                        justifyContent="center"
                        variant="h4"
                        color="#FFFDFA"
                      >
                        Total Student
                      </Typography>
                    </Link>
                    <Typography
                      variant="h3"
                      component="div"
                      color="white"
                      mt={1}
                    >
                      {totalStudents.total_students}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  margin: "auto",
                  maxWidth: 400,
                  flexGrow: 1,
                  borderRadius: "10px",
                  backgroundColor: "#c86fc9",
                  backgroundImage:
                    "linear-gradient(rgb(231, 74, 59) 10%, rgb(190, 38, 23) 100%)",
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <PushPinIcon
                        sx={{ width: 80, height: 80, color: "black" }}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs>
                    <Link
                      to="/GetAllCompanies"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        gutterBottom
                        component="big"
                        display="flex"
                        justifyContent="center"
                        variant="h4"
                        color="#FFFDFA"
                      >
                        Hiring Companies
                      </Typography>
                    </Link>
                    <Typography
                      variant="h3"
                      component="div"
                      color="white"
                      mt={1}
                    >
                      {companyCount.count}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  margin: "auto",
                  maxWidth: 400,
                  flexGrow: 1,
                  borderRadius: "10px",
                  backgroundColor: "#ffff45",
                  backgroundImage:
                    "linear-gradient(rgb(28, 200, 138) 10%, rgb(19, 133, 92) 100%)",
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <PushPinIcon
                        sx={{ width: 80, height: 80, color: "black" }}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs>
                    <Link to="/GetAllAdmin" style={{ textDecoration: "none" }}>
                      <Typography
                        gutterBottom
                        component="big"
                        display="flex"
                        justifyContent="center"
                        variant="h4"
                        color="#FFFDFA"
                      >
                        Total TPO's
                      </Typography>
                    </Link>
                    <Typography
                      variant="h3"
                      component="div"
                      color="white"
                      mt={1}
                    >
                      {adminCount.count}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        {/* <Box sx={{ paddingTop: "20px" }}>
          <Marquee style={{ fontFamily: "sans-serif", fontSize: "1.5rem", color:"red" }}>
          Empowering individuals with the skills they need for a successful future.
          </Marquee>
        </Box> */}
        <Box sx={{ width: "100%", minHeight: "70%", padding: "60px" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} md={12}>
              <Typography
                variant="h3"
                style={{
                  textAlign: "center",
                  marginTop: "60px",
                  marginBottom: "40px",
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                Event Calendar
              </Typography>
              <Paper
                elevation={12}
                sx={{
                  p: "10px",
                  width: "80vw",
                  margin: "auto",
                }}
              >
                <EventCalender />
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <Typography
          variant="h3"
          style={{
            textAlign: "center",
            marginTop: "60px",
            marginBottom: "40px",
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Placement and Training Analytics
        </Typography>

        <Card elevation={12} sx={{ width: "85vw" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                  padding: "60px",
                  height: "100%", // Added to make the container fill the available height
                }}
              >
                <Box sx={{ maxWidth: "100%", width: "500px" }}>
                  <StudentChart />
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                  padding: "60px",
                  height: "100%", // Added to make the container fill the available height
                }}
              >
                <Box sx={{ maxWidth: "100%", width: "500px" }}>
                  <LineChart />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        <Box>
        <Typography
          variant="h3"
          style={{
            textAlign: "center",
            marginTop: "60px",
            marginBottom: "40px",
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
         Student Placed
        </Typography>
        <StudentPlaced />
        </Box>
      </Box>
    </>
  );
};
