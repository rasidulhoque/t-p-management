import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
  Modal,
  BottomNavigationAction,
} from "@mui/material";
import { React, useState, useEffect, useContext } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoneyIcon from "@mui/icons-material/Money";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Nav_company from "../Nav/Nav_company";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import {
  CompanyNameContext,
  DepartmentContext,
} from "../StudentProfile/contexts/StepperContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import JobPost from "./JobPost";
import JobPost2 from "./JobPost2";
export const JobDrivesMe = () => {
  const [open, setOpen] = useState(false);
  const [job_id, setJob_id] = useState(null);
  const [selected, setSelected] = useState(false);
  const { department, setDepartment } = useContext(DepartmentContext);
  const handleClick = () => {
    setSelected(!selected);
  };
  const handleClickOpen = (job_id) => {
    setJob_id(job_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [jobPosts, setJobPosts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/auth/jobDrivesStudentDept/${department}`)
      .then((response) => {
        setJobPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Grid container spacing={10} marginTop="15px" paddingLeft="50px">
        {jobPosts.map((jobPost) => (
          <Grid xs={12} md={4} key={jobPost.job_id} sx={{ padding: "10px" }}>
            <Card sx={{ maxWidth: 500 }} elevation={6}>
              {console.log(jobPost, "nanananana")}
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      backgroundColor: "red",
                      width: "100px",
                      height: "100px",
                    }}
                    aria-label="recipe"
                    src={`http://localhost:4000/assets/${jobPost.logo}`}
                  >
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={
                  <Typography variant="h4" sx={{ fontSize: "28px" }}>
                    {jobPost.job_name}
                  </Typography>
                }
                subheader={
                  <>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      sx={{ fontSize: "20px" }}
                    >
                      <BusinessIcon
                        fontSize="small"
                        sx={{ marginRight: "6px" }}
                      />
                      {jobPost.company_name}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
                      <LocationOnIcon
                        fontSize="small"
                        sx={{ marginRight: "6px" }}
                      />
                      {jobPost.company_address}
                    </Typography>
                  </>
                }
              />
              <div style={{ padding: "20px" }}>
                <Stack direction="row" spacing={1} sx={{}}>
                  <Chip
                    label={jobPost.perks}
                    sx={{
                      minWidth: "150px",
                      minHeight: "25px",
                      diplay: "flex",
                      justifyContent: "space-evenly",
                    }}
                    avatar={<MoneyIcon />}
                  />
                  <Chip
                    label={jobPost.job_type}
                    sx={{
                      minWidth: "150px",
                      minHeight: "25px",
                      diplay: "flex",
                      justifyContent: "space-evenly",
                    }}
                    avatar={<BusinessCenterIcon />}
                  />
                </Stack>
              </div>
              <div>
                <CardContent>
                  <Typography variant="body2" color="Highlight">
                    {jobPost.eligibility}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="InactiveBorder"
                    sx={{ marginTop: "10px" }}
                  >
                    <span style={{ color: "red", marginRight: "6px" }}>
                      <AnnouncementIcon fontSize="small" />
                      Application Deadline:
                    </span>
                    {jobPost.deadline}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="InactiveBorder"
                    sx={{ marginTop: "10px" }}
                  >
                    <span style={{ color: "red" }}>
                      <RunningWithErrorsIcon sx={{ paddingRight: "5px" }} />
                      Duration/Period:
                    </span>
                    {jobPost.duration}
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    paddingTop="25px"
                    paddingLeft="11px"
                  >
                    {/* <Grid item xs={12} md={9}> */}
                    <Typography variant="inherit" color="InfoText">
                      <span style={{ color: "red", marginRight: "5px" }}>
                        <LocationOnIcon />
                        Job Location:
                      </span>
                      {jobPost.job_location}
                    </Typography>
                    {/* </Grid> */}
                    {/* <Grid xs={12} md={3}></Grid> */}
                  </Grid>
                  <CardActions
                    sx={{
                      paddingTop: "20px",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <div>
                      <BottomNavigationAction
                        label="Favorites"
                        icon={
                          selected ? (
                            <FavoriteIcon style={{ color: "red" }} />
                          ) : (
                            <FavoriteBorderIcon />
                          )
                        }
                        onClick={handleClick}
                      />
                      <Chip
                        label="Apply"
                        variant="outlined"
                        onClick={() => handleClickOpen(jobPost.job_id)}
                        sx={{
                          minWidth: "150px",
                          minHeight: "25px",
                          diplay: "flex",
                          justifyContent: "space-evenly",
                          cursor: "pointer",
                        }}
                        avatar={<SystemUpdateAltIcon />}
                      />
                    </div>
                  </CardActions>
                </CardContent>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} md={4}></Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { maxWidth: "60%", maxHeight: "700px" } }}
      >
        <div style={{ padding: "30px" }}>
          <DialogTitle>{"Are you sure to apply?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Please check your details in Profile section before ayppliying.
            </DialogContentText>
          </DialogContent>
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Done</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
