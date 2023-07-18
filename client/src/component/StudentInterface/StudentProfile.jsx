import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "@mui/material/styles/styled";
import {
  Card,
  Container,
  Grid,
  Typography,
  TextField,
  Avatar,
  Button,
} from "@mui/material";
import { UsernameContext } from "../StudentProfile/contexts/StepperContext";
import { Link } from "react-router-dom";

const RootContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const ProfileCard = styled(Card)({
  padding: "2rem",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
  borderRadius: "1rem",
  maxWidth: "30rem",
});

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: (theme) => theme.spacing(4),
});

const Heading = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "1rem",
  color: "#3f51b5",
  textTransform: "uppercase",
});

const SubHeading = styled(Typography)({
  fontWeight: "bold",
  color: "#3f51b5",
});

const ProfileText = styled(Typography)({
  border: "2px solid #ccc",
  borderRadius: "0.5rem",
  padding: "0.5rem",
  marginTop: "0.5rem",
  marginBottom: "1rem",
});

export const StudentProfile = () => {
  const [profile, setProfile] = useState({});
  const { username, setUsername } = useContext(UsernameContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/auth/get_stu_profile/${username}`
        );
        console.log(response.data, "haahah");
        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [username]);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };
  const handleClick = () => {
    console.log("Button clicked");
  };
  console.log(profile, "profile");
  return (
    <RootContainer maxWidth="sm">
      <ProfileCard>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid item xs={12}>
            <Heading variant="h4" align="center">
              Student Profile
            </Heading>
          </Grid>
          <Avatar
            src={`http://localhost:4000/assets/${profile.profilePic}`}
            alt="Upload Profile Picture"
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
          <Grid item xs={12} md={6}>
            <SubHeading variant="h6">Username:</SubHeading>
            <ProfileText variant="body1">{username}</ProfileText>
          </Grid>
          <Grid item xs={12} md={6}>
            <SubHeading variant="h6">Email:</SubHeading>
            <ProfileText variant="body1">{profile.email}</ProfileText>
          </Grid>
          <Grid item xs={12} md={6}>
            <SubHeading variant="h6">Name:</SubHeading>
            <ProfileText variant="body1">{profile.firstName} {profile.lastName}</ProfileText>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <SubHeading variant="h6">Department:</SubHeading>
            <ProfileText variant="body1">{profile.department}</ProfileText>
          </Grid>
          <Grid item xs={12} md={6}>
            <SubHeading variant="h6">Course:</SubHeading>
            <ProfileText variant="body1">{profile.course}</ProfileText>
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <SubHeading variant="h6">College:</SubHeading>
            <ProfileText variant="body1">{profile.college}</ProfileText>
          </Grid>{" "} */}
          <Grid item xs={12} md={6}>
            <SubHeading variant="h6">Batch:</SubHeading>
            <ProfileText variant="body1">{profile.batch}</ProfileText>
          </Grid>{" "}
          <Grid item xs={12} md={6}>
            <SubHeading variant="h6">Phone Number:</SubHeading>
            <ProfileText variant="body1">{profile.ph_no}</ProfileText>
          </Grid>{" "}
          <Grid item xs={12} md={6}>
            <SubHeading variant="h6">Institute:</SubHeading>
            <ProfileText variant="body1">{profile.institute}</ProfileText>
          </Grid>
        </Grid>
        <Typography color="error" variant="caption" align="center">
          These credentials will be considered at the company's side, please
          check them carefully.
        </Typography>
        <Link to="/stu_pro">
          <Button
            variant="outlined"
            color="primary"
            sx={{ display: "flex", marginLeft: "80%" }}
          >
            update
          </Button>
        </Link>
      </ProfileCard>
    </RootContainer>
  );
};
