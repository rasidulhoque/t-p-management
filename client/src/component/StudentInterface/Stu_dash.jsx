import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import Nav4 from "../Nav/Nav4";
import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Person2Icon from "@mui/icons-material/Person2";
import PushPinIcon from "@mui/icons-material/PushPin";
import Marquee from "react-fast-marquee";
import lottie1 from "../../assets/images/75120-student.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { StudentProfile } from "./StudentProfile";
import { Grid } from "@mui/material";
import {
  DepartmentContext,
  UsernameContext,
} from "../StudentProfile/contexts/StepperContext";
import { EventAndNews } from "../Homepage/EventAndNews";
export const Stu_dash = () => {
  const { setUsername } = useContext(UsernameContext);
  const { setDepartment } = useContext(DepartmentContext);
  useEffect(() => {
    console.log("refresh studnet");
    setUsername(localStorage.getItem("username"));
    setDepartment(localStorage.getItem("department"));
  }, []);
  return (
    <>
      <Nav4 />
      <Box sx={{ paddingLeft: "16%" }}>
        <Grid
          sx={{ paddingBottom: "60px" }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 500,
                flexGrow: 1,
                borderRadius: "10px",
                backgroundImage:
                  "linear-gradient(rgb(78, 115, 223) 10%, rgb(34, 74, 190) 100%)",
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 168, height: 168 }}>
                    <PushPinIcon sx={{ width: 100, height: 116 }} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Link to="/MyApplicatons">
                        <Typography
                          gutterBottom
                          variant="h4"
                          component="article"
                          display="flex"
                          color="#FFFDFA"
                          justifyContent="center"
                          paddingTop="15%"
                        >
                          My Applications
                        </Typography>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h4"
                        component="div"
                        display="flex"
                        justifyContent="center"
                        color="#FFFDFA"
                        paddingBottom="90%"
                      ></Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 500,
                flexGrow: 1,
                borderRadius: "10px",
                backgroundColor: "#c86fc9",
                backgroundImage:
                  "linear-gradient(rgb(231, 74, 59) 10%, rgb(190, 38, 23) 100%)",
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 168, height: 168 }}>
                    <ApartmentIcon sx={{ width: 100, height: 116 }} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Link to="/GetAllCompaniesStudent">
                        <Typography
                          gutterBottom
                          variant="h4"
                          component="article"
                          color="#FFFDFA"
                          display="flex"
                          justifyContent="center"
                          paddingTop="15%"
                        >
                          Hiring Companies
                        </Typography>
                      </Link>
                      {/* <Typography variant="subtitle2" color="text.secondary">
                        ID: 1030114
                      </Typography> */}
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h4"
                        component="div"
                        display="flex"
                        color="#FFFDFA"
                        justifyContent="center"
                        paddingBottom="90%"
                      ></Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 500,
                flexGrow: 1,
                borderRadius: "10px",
                backgroundColor: "#ffff45",
                backgroundImage:
                  "linear-gradient(rgb(28, 200, 138) 10%, rgb(19, 133, 92) 100%)",
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 168, height: 168 }}>
                    <Person2Icon sx={{ width: 100, height: 116 }} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Link to="/JobTab">
                        <Typography
                          gutterBottom
                          variant="h4"
                          color="#FFFDFA"
                          component="big"
                          display="flex"
                          justifyContent="center"
                          paddingTop="15%"
                        >
                          Placement Drives
                        </Typography>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h4"
                        component="div"
                        display="flex"
                        color="#FFFDFA"
                        justifyContent="center"
                        paddingBottom="90%"
                      ></Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Lottie
                animationData={lottie1}
                style={{ width: "700px", height: "700px" }}
              />
              <StudentProfile />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{paddingBottom:"10px"}}>
          <Marquee
            style={{
              fontFamily: "sans-serif",
              fontSize: "1.5rem",
              color: "red",
            }}
            speed="60"
          >
            **For any enquiry or for more details on events please contact the TPO
          </Marquee>
          <EventAndNews />
        </Box>
      </Box>
    </>
  );
};
