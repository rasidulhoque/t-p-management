import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Box, ButtonGroup } from "@mui/material";
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

  return (
    <Box sx={{ padding: "40px" }}>
      <Grid container spacing={4}>
        {companyDetails.map((company, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                minHeight: "500px",
                border: "2px solid #d43f3a",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ width: "150px", height: "150px" }}
                alt="j"
                src={`http://localhost:4000/assets/${company.logo}`}
                title="Click to view file"
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "#2d2d2d",
                    fontWeight: "bold",
                    marginTop: "1rem",
                  }}
                >
                  {company.company_name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Lato, sans-serif",
                    color: "#2d2d2d",
                    fontSize: "1.2rem",
                    marginTop: "0.5rem",
                  }}
                >
                  {company.tag_line}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Lato, sans-serif",
                    color: "#888888",
                    marginTop: "1rem",
                  }}
                >
                  Established: {company.est}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Lato, sans-serif",
                    color: "#888888",
                  }}
                >
                  Headquarter: {company.headquarter}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Lato, sans-serif",
                    color: "#888888",
                  }}
                >
                  Email: {company.email}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Lato, sans-serif",
                    color: "#888888",
                    marginTop: "1rem",
                  }}
                >
                  Description: {company.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  href={company.media_links}
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "#d43f3a",
                    fontWeight: "bold",
                  }}
                >
                  Visit website
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
