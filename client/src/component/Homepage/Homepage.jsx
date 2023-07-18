import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Nav2 from "../Nav/Nav2";
import HOME1 from "../../assets/images/gpPic.jpg";
import HOME2 from "../../assets/images/homepage2.png";
import HOME3 from "../../assets/images/background.png";
import { Box, fontSize, padding } from "@mui/system";
import Typewriter from "typewriter-effect";
import { Grid, Typography } from "@mui/material";
import LOGO1 from "../../assets/images/mainlogo.png";
import { CssBaseline } from "@mui/material";
import { AppBar } from "@mui/material";
import { Toolbar, Button, MobileStepper, Paper, useTheme } from "@mui/material";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import { GetAllAdminHome } from "../AdminInterface/GetAllAdminHome";
import ImageGalary from "./ImageGalary";
import GetAllCompaniesHome from "../AdminInterface/GetAllCompaniesHome";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const Homepage = () => {
  const [latestEvents, setLatestEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/auth/get_event_details")
      .then((response) => setLatestEvents(response.data.events))
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#012949",
          },
        }}
      >
        <img src={LOGO1} width="200px" />
        <Typography variant="h4" fontStyle={"oblique"} color="#FFA500">
          Your gateway to a successful career.
        </Typography>
      </Box>
      <Nav2 />
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          width: "100vw",
          alignItems: "center",
          background: "linear-gradient(to right, #ffffff,pink",
        }}
      >
        <Grid item xs={12} md={4}>
          <Box>
            <img src={HOME2} alt="" />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="App" style={{ fontSize: "2em", color: "red" }}>
            <Typewriter
              options={{
                loop: true,
                delay: 50,
                // typeSpeed: 150, // Adjust the typing speed here
                deleteSpeed: 50, // Adjust the deleting speed here
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("We connect the right talent")
                  .typeString(" with the ")
                  .typeString("right opportunity!!!")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Looking for the perfect job?")
                  .typeString(" We can help!")
                  .pauseFor(1000)
                  .deleteAll()
                  .start();
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box></Box>
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: "20px" }}>
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <WorkspacePremiumIcon sx={{ fontSize: "32px" }} />
            <Typography variant="h5" sx={{ color: "red" }}>
              WE ARE DECLARED AS THE TOP PLACEMENT PROVIDER BY COMPETETION
              SUCCESS REVIEW
            </Typography>
          </Box>
          <Typography paragraph sx={{ marginTop: "20px" }} variant="h6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Button variant="contained">Read More</Button>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: "20vw",
                height: "50vh",
              },
            }}
          >
            <Paper elevation={6}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  height: "430px",
                }}
              >
                <ListItem sx={{ textAlign: "center" }}>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "24px", color: "red" }}
                    primary="News & Event"
                  />
                </ListItem>
                <Divider component="li" />

                {latestEvents.map((event) => (
                  <div key={event.event_name}>
                    <ListItem>
                      <ListItemText
                        primaryTypographyProps={{ color: "blue" }}
                        primary={event.event_name}
                        secondaryTypographyProps={{ color: "text.primary" }}
                        secondary={`Starts on: ${new Date(
                          event.starting_date
                        ).toLocaleDateString()}`}
                      />
                    </ListItem>
                    <Divider component="li" />
                  </div>
                ))}
              </List>
              <Link to="/EventAndNews">
                <Button
                  variant="outlined"
                  sx={{
                    display: "flex-end",
                    marginLeft: "200px",
                    marginTop: "-27px",
                  }}
                >
                  View More
                </Button>
              </Link>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <div style={{ marginTop: "30px" }}>
        <Paper
          elevation={5}
          sx={{
            width: "100vw",
            minHeight: "40vh",
            backgroundColor: " #E1D9D1",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: "20px" }}>
            <Typography
              variant="h4"
              style={{
                alignContent: "center",
                display: "flex",
                justifyContent: "center",
                padding: "2%",
                color: "ActiveCaption",
              }}
            >
              <span style={{ borderBottom: "2px solid red" }}>
                Our experienced team of TPOs
              </span>
            </Typography>
            <GetAllAdminHome />
          </div>
        </Paper>
      </div>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <Grid item xs={12} md={6}>
          <ImageGalary />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
            backgroundColor: "#F5F5F5", // change the background color
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{ textAlign: "center", fontWeight: "bold", mb: "20px" }}
          >
            Welcome to our Placement and Training Management System
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              textAlign: "center",
              fontStyle: "italic",
              mb: "40px",
              color: "#777777", // change the text color
            }}
          >
            Your gateway to a brighter career
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              textAlign: "justify",
              lineHeight: "1.6",
              color: "#333333", // change the text color
            }}
          >
            Our system is designed to connect you with top companies in your
            field and provide you with the skills and knowledge you need to
            succeed in your career. Whether you are just starting out or looking
            to advance your career, we are here to support you every step of the
            way. With our user-friendly platform, you can easily search and
            apply for job openings, access training resources, and connect with
            other professionals in your industry. Our team of experienced
            trainers and career coaches are dedicated to helping you achieve
            your goals and reach your full potential. At our Placement and
            Training Management System, we believe that everyone deserves a
            chance to succeed. Join us today and take the first step towards a
            brighter future.
          </Typography>
        </Grid>
      </Grid>
      <Grid sx={{ padding: "40px", backgroundColor: "palegoldenrod" }}>
        <GetAllCompaniesHome />
      </Grid>
      <Footer />
    </>
  );
};

export default Homepage;
