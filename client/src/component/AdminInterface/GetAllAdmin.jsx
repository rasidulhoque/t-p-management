import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Avatar, Grid, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Chevrolet from "../../assets/images/man.png";
import { Box } from "@mui/material";
import Admin from "../Nav/Admin";
import { useContext } from "react";
import { AdminProfilePictureContext } from "../StudentProfile/contexts/StepperContext";
export const GetAllAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const { photo, setPhoto } = useContext(AdminProfilePictureContext);

  useEffect(() => {
    axios
      .get("http://localhost:4000/auth/get_TPO_profile")
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (username) => {
    axios
      .delete(`http://localhost:4000/auth/Delete_admin/${username}`)
      .then((response) => {
        setAdmins(admins.filter((admins) => admins.username !== username));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log(admins, "dhfdj");
  return (
    <>
      <Admin />
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "center", marginLeft: "16%" }}
      >
        {admins.map((admin) => (
          <Grid
            item
            xs={12}
            md={3}
            key={admin.employee_id}
            sx={{ borderRadius: "80px", padding: "20px" }}
          >
            <Card
              elevation={12}
              sx={{
                minWidth: 340,
                minHeight: 470,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                borderRadius: "20px",
                border: "2px solid red",
              }}
            >
              <Avatar
                alt="Chevrolet"
                src={`http://localhost:4000/assets/${admin.photo}`}
                sx={{ width: 140, height: 140 }}
                style={{ margin: "auto" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="article"
                  color="red"
                >
                  Name: {admin.name}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="inherit"
                    color="ActiveCaption"
                    sx={{ fontWeight: "bold" }}
                  >
                    Designation:
                  </Typography>
                  <Typography variant="inherit" color="ActiveCaption">
                    {admin.designation}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="inherit"
                    color="ActiveCaption"
                    sx={{ fontWeight: "bold" }}
                  >
                    Highest Qualification:
                  </Typography>
                  <Typography variant="inherit" color="text.ActiveCaption">
                    {admin.high_qualification}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="inherit"
                    color="ActiveCaption"
                    sx={{ fontWeight: "bold" }}
                  >
                    Joining Year:
                  </Typography>
                  <Typography variant="inherit" color="text.ActiveCaption">
                    {admin.joining_date}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="inherit"
                    color="ActiveCaption"
                    sx={{ fontWeight: "bold" }}
                  >
                    Email:
                  </Typography>
                  <Typography variant="inherit" color="text.ActiveCaption">
                    {admin.email}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="inherit"
                    color="ActiveCaption"
                    sx={{ fontWeight: "bold" }}
                  >
                    Phone Number:
                  </Typography>
                  <Typography variant="inherit" color="text.ActiveCaption">
                    {admin.ph_no}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="inherit"
                    color="ActiveCaption"
                    sx={{ fontWeight: "bold" }}
                  >
                    Linkedin ID:
                  </Typography>
                  <Typography variant="inherit" color="text.ActiveCaption">
                    {admin.linkedin_id}
                  </Typography>
                </Box>

                {!admin.is_master_admin && (
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ marginTop: "20px" }}
                      onClick={() => handleDelete(admin.username)}
                    >
                      Remove Admin
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
