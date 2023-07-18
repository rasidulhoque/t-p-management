import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Typography, ButtonBase, Button } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import Admin from "../Nav/Admin";
import { Dialog, DialogTitle, DialogContent, TextField } from "@mui/material";
import axios from "axios";
import { HomepageidContext } from "../StudentProfile/contexts/StepperContext";
export const ManageHomepage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [openDialog3, setOpenDialog3] = useState(false);
  const [aboutPlacementCell, setAboutPlacementCell] = useState("");
  const [aboutPlacementPro, setAboutPlacementPro] = useState("");
  // const { id } = useContext(HomepageidContext);
  const [id] = useState("");
  const handleDialogOpen1 = () => {
    setOpenDialog(true);
  };
  const handleDialogClose1 = () => {
    setOpenDialog(false);
  };
  // const handleSubmit1 = () => {
  //   setOpenDialog(false);

  //   const formData = new FormData();
  //   formData.append("aboutPlacementCell", aboutPlacementCell);

  //   axios
  //     .put(
  //       `http://localhost:4000/auth/postHomepageAboutCollege/${id}`,
  //       formData
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  const handleSubmit1 = (event) => {
    event.preventDefault();

    // Get the ID from the URL or replace '1' with your desired ID
    const id = "1";

    if (!id) {
      alert("Invalid ID");
      return;
    }

    // Prepare the data to be sent
    const data = {
      aboutPlacementCell: aboutPlacementCell,
    };

    // Send the PUT request
    axios
      .put(`http://localhost:4000/auth/postHomepageAboutCollege/${id}`, data)
      .then((response) => {
        console.log(response.data);
        alert("Homepage updated");
      })
      .catch((error) => {
        console.error(error);
        alert("Error updating homepage");
      });
  };

  const handleDialogOpen2 = () => {
    setOpenDialog2(true);
  };

  const handleDialogClose2 = () => {
    setOpenDialog2(false);
  };
  const handleSubmit2 = () => {
    const formData = new FormData();
    formData.append("aboutPlacementPro", aboutPlacementPro);

    axios
      .post(
        "http://localhost:4000/auth/postHomepageAboutPlacementPro",
        formData
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDialogOpen3 = () => {
    setOpenDialog3(true);
  };

  const handleDialogClose3 = () => {
    setOpenDialog3(false);
    const formData = new FormData();
    const files = document.querySelector('input[type="file"]').files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("gallery", files[i]);
      }
    }

    axios
      .post("http://localhost:4000/postHomepageGallery", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <Admin />
      <Grid sx={{ paddingLeft: "16%" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={12}
              onClick={handleDialogOpen1}
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 400,
                flexGrow: 1,
                borderRadius: "10px",
                backgroundColor: "#f7f7f7",
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
                    <PushPinIcon sx={{ width: 80, height: 80 }} />
                  </ButtonBase>
                </Grid>
                <Grid item xs>
                  <Typography
                    variant="h5"
                    component="h2"
                    color="#333"
                    fontWeight="bold"
                  >
                    About College Placement
                  </Typography>
                  <Typography
                    variant="h3"
                    component="div"
                    color="#333"
                    mt={1}
                  ></Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Dialog open={openDialog} maxWidth="sm" fullWidth>
            <DialogContent sx={{ p: 4, backgroundColor: "#f5f5f5" }}>
              <Typography
                variant="h4"
                sx={{
                  mb: 3,
                  color: "#333333",
                  backgroundColor: "#ffcc00",
                  padding: "8px",
                }}
              >
                About the College Placement
              </Typography>
              <TextField
                label="Enter your text"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 3 }}
                // value={aboutPlacementCell}
                // onChange={(e) => setAboutPlacementCell(e.target.value)}
                value={aboutPlacementCell}
                onChange={(event) => setAboutPlacementCell(event.target.value)} 
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit1}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDialogClose1}
                >
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={12}
              onClick={handleDialogOpen2}
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 400,
                flexGrow: 1,
                borderRadius: "10px",
                backgroundColor: "#f7f7f7",
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
                    <PushPinIcon sx={{ width: 80, height: 80 }} />
                  </ButtonBase>
                </Grid>
                <Grid item xs>
                  <Typography
                    variant="h5"
                    component="h2"
                    color="#333"
                    fontWeight="bold"
                  >
                    About Placement Pro
                  </Typography>
                  <Typography
                    variant="h3"
                    component="div"
                    color="#333"
                    mt={1}
                  ></Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Dialog open={openDialog2} maxWidth="sm" fullWidth>
            <DialogContent sx={{ p: 4, backgroundColor: "#f5f5f5" }}>
              <Typography
                variant="h4"
                sx={{
                  mb: 3,
                  color: "#333333",
                  backgroundColor: "#ffcc00",
                  padding: "8px",
                }}
              >
                About Placement Pro
              </Typography>
              <TextField
                label="Enter your text"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 3 }}
                value={aboutPlacementPro}
                onChange={(e) => setAboutPlacementPro(e.target.value)}
              />
              {/* Add the Submit and Cancel buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit2}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDialogClose2}
                >
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={12}
              onClick={handleDialogOpen3}
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 400,
                flexGrow: 1,
                borderRadius: "10px",
                backgroundColor: "#f7f7f7",
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
                    <PushPinIcon sx={{ width: 80, height: 80 }} />
                  </ButtonBase>
                </Grid>
                <Grid item xs>
                  <Typography
                    variant="h5"
                    component="h2"
                    color="#333"
                    fontWeight="bold"
                  >
                    Photo Gallery
                  </Typography>
                  <Typography
                    variant="h3"
                    component="div"
                    color="#333"
                    mt={1}
                  ></Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Dialog
          open={openDialog3}
          onClose={handleDialogClose3}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent sx={{ p: 4, backgroundColor: "#f5f5f5" }}>
            <Typography variant="h4" sx={{ mb: 3, color: "#333333" }}>
              Photo Galary
            </Typography>
            <input
              type="file"
              accept=".txt,.pdf,.doc,.docx,.png,.jpg"
              multiple
            />
            <Button variant="contained" component="label">
              Upload Files
              <input type="file" hidden />
            </Button>
          </DialogContent>
        </Dialog>
      </Grid>
    </>
  );
};
