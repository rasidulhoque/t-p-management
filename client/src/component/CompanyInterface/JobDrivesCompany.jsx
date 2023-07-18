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
} from "@mui/material";
import { React, useState, useEffect, useContext } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoneyIcon from "@mui/icons-material/Money";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Nav_company from "../Nav/Nav_company";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import { CompanyLogoContext, CompanyNameContext } from "../StudentProfile/contexts/StepperContext";
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
import JobPost from "./JobPost";
import JobPost2 from "./JobPost2";
import PageviewIcon from "@mui/icons-material/Pageview";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const JobDrivesCompany = () => {
  const [open, setOpen] = useState(false);
  const [job_id, setJob_id] = useState(null);
  const handleClickOpen = (job_id) => {
    setJob_id(job_id);
    setOpen(true);
  };
  // const handleClickAppliedJobs = (job_id) => {
  //   setJob_id(job_id);
  // }

  const handleClose = () => {
    setOpen(false);
  };
  const [jobPosts, setJobPosts] = useState([]);
  const {logo} = useContext(CompanyLogoContext);
  const navigate = useNavigate();
  const { companyName, setCompanyName } = useContext(CompanyNameContext);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/auth/get_field_from_jobPost/${companyName}`)
      .then((response) => {
        setJobPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Nav_company />
      <Grid
        container
        spacing={10}
        marginLeft="250px"
        paddingRight="250px"
        marginTop="20px"
        width="100vw"
      >
        {jobPosts.map((jobPost) => (
          <Grid xs={12} md={4} key={jobPost.job_id} sx={{ padding: "10px" }}>
            {console.log(jobPost, "nanananana")}
            <Card sx={{ maxWidth: 500 }} elevation={6}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      backgroundColor: "red",
                      width: "100px",
                      height: "100px",
                    }}
                    aria-label="recipe"
                    src={`http://localhost:4000/assets/${logo}`}
                  />
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
                  <Typography variant="body2" color="blue">
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
                    <Grid xs={12} md={9}>
                      <Typography variant="inherit" color="InfoText">
                        <span style={{ color: "red", marginRight: "5px" }}>
                          <LocationOnIcon />
                          Job Location:
                        </span>
                        {jobPost.job_location}
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={3}></Grid>
                  </Grid>
                  <CardActions>
                    <Grid
                      sx={{
                        justifyContent: "space-evenly",
                        display: "flex",
                        paddingTop: "20px",
                        width: "100%",
                      }}
                    >
                      <Chip
                        label="Update"
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
                      {/* <Link to={`/AppliedStudents/${jobPost.job_id}`}> */}
                      <Chip
                        label="View Applications"
                        onClick={() =>
                          navigate(`/AppliedStudents/${jobPost.job_id}`)
                        }
                        variant="outlined"
                        sx={{
                          minWidth: "150px",
                          minHeight: "25px",
                          diplay: "flex",
                          justifyContent: "space-evenly",
                          cursor: "pointer",
                        }}
                        avatar={<PageviewIcon />}
                      />
                      {/* </Link> */}
                    </Grid>
                  </CardActions>
                </CardContent>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { maxWidth: "60%", maxHeight: "700px" } }}
      >
        <div style={{ padding: "30px" }}>
          <JobPost2 job_id={job_id} />
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Done</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
