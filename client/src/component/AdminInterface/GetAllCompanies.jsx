import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Box } from "@mui/material";
import { Grid } from "@mui/material";
import logo from "../../assets/images/microsoft.png";
import Admin from "../Nav/Admin";

export default function GetAllCompanies() {
  const [companyDetails, setCompanyDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/auth/get_company_profile")
      .then((response) => {
        setCompanyDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRemoveAdmin = (username) => {
    axios
      .delete(`http://localhost:4000/auth/delete_company/${username}`)
      .then((response) => {
        setCompanyDetails(
          companyDetails.filter((company) => company.username !== username)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Admin />
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "40px",
          marginLeft:"5%"
        }}
        spacing={7}
      >
        {companyDetails.map((company, index) => (
          <Grid item>
            <Card
              key={index}
              sx={{
                width: "400px",
                padding: "20px",
                border: "2px solid red",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "500px",
                marginTop: "40px",
                marginLeft:"14%"
              }}
            >
              <Avatar
                sx={{ width: "100px", height: "100px" }}
                alt="j"
                src={`http://localhost:4000/assets/${company.logo}`}
                title="Click to view file"
              />
              <CardContent
                sx={{
                  minHeight: "70%",
                  minWidth: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "Space-evenly",
                  alignItems: "center",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="article"
                  color="red"
                >
                  Name: {company.company_name}
                </Typography>
                <Typography variant="inherit" color="text.ActiveCaption">
                  Tag Line: {company.tag_line}
                </Typography>
                <Typography variant="inherit" color="ActiveCaption">
                  Established: {company.est}
                </Typography>
                <Typography variant="inherit" color="text.ActiveCaption">
                  Headquarter: {company.headquarter}
                </Typography>
                <Typography variant="inherit" color="text.ActiveCaption">
                  Email: {company.email}
                </Typography>
                <Typography variant="inherit" color="text.ActiveCaption">
                  Description: {company.description}
                </Typography>
                <CardActions>
                  <Button size="small" href={company.media_links}>
                    {company.media_links}
                  </Button>
                </CardActions>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ marginTop: "20px" }}
                    onClick={() => handleRemoveAdmin(company.username)}
                  >
                    Remove Company
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
