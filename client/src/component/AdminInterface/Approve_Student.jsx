import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { useState, useEffect } from "react";
import ApprovedStudent from "./ApprovedStudent";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  IconButton,
  Avatar,
} from "@mui/material";
import { TableContainer } from "@mui/material";
import { Paper } from "@mui/material";
import { Table } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Nav from "../Nav/Nav";
import Admin from "../Nav/Admin";
import TotalStudent from "./TotalStudent";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function Approve_Student() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/auth/get_students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleApprove = (username) => {
    axios
      .put("http://localhost:4000/auth/approve_student", {
        username: username,
        status: "approved",
      })
      .then((res) => {
        console.log(res.data);
        // Remove the approved student from the table
        setStudents((prevStudents) => {
          return prevStudents.filter((student) => {
            return student.username !== username;
          });
        });
        // Show the approval message
        alert("Student approved!");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  return (
    <>
      <Admin />
      <Box sx={{ width: { md: "88vw" }, marginLeft: { md: "250px" } }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Pending Approval" {...a11yProps(0)} />
            <Tab label="Approved" {...a11yProps(1)} />
        
          </Tabs>
        </Box>
        <div style={{ marginRight: "7%" }}>
          <TabPanel value={value} index={0}>
            <TableContainer
              component={Paper}
              sx={{ maxWidTableCell: 1000, marginTop: "50px" }}
            >
              <Table
                sx={{ minWidTableCell: 900 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>First Name</StyledTableCell>
                    <StyledTableCell>Last Name</StyledTableCell>
                    <StyledTableCell>Username</StyledTableCell>
                    <StyledTableCell>Phone Number</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell>Course</StyledTableCell>
                    <StyledTableCell>Registration Number</StyledTableCell>
                    <StyledTableCell>Registration Card</StyledTableCell>
                    <StyledTableCell>Resume</StyledTableCell>
                    <StyledTableCell>Profile Picture</StyledTableCell>
                    <StyledTableCell>Approve</StyledTableCell>
                    <StyledTableCell>Reject</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => {
                    console.log(student.reg_card, "kdfjdj");
                    return (
                      <TableRow key={student.username}>
                        <TableCell>{student.firstName}</TableCell>
                        <TableCell>{student.lastName}</TableCell>
                        <TableCell>{student.username}</TableCell>
                        <TableCell>{student.ph_no}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell>{student.reg_no}</TableCell>
                        <TableCell>
                          <Avatar
                            sx={{
                              width: "80px",
                              height: "80px",
                              border: "1px solid black",
                            }}
                            alt="j"
                            src={`http://localhost:4000/assets/${student.reg_card}`}
                            onClick={() =>
                              window.open(
                                `http://localhost:4000/assets/${student.reg_card}`,
                                "_blank"
                              )
                            }
                            title="Click to view file"
                          />
                        </TableCell>
                        <TableCell>
                          <Avatar
                            sx={{ width: "80px", height: "80px" }}
                            alt="j"
                            src={`http://localhost:4000/assets/${student.resume}`}
                            onClick={() =>
                              window.open(
                                `http://localhost:4000/assets/${student.resume}`,
                                "_blank"
                              )
                            }
                            title="Click to view file"
                          />
                        </TableCell>
                        <TableCell>
                          <Avatar
                            sx={{
                              width: "80px",
                              height: "80px",
                              border: "1px solid black",
                            }}
                            alt="j"
                            src={`http://localhost:4000/assets/${student.profilePic}`}
                            onClick={() =>
                              window.open(
                                `http://localhost:4000/assets/${student.profilePic}`,
                                "_blank"
                              )
                            }
                            title="Click to view file"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleApprove(student.username)}
                            sx={{
                              backgroundColor: "green",
                              color: "white",
                              borderRadius: "50px",
                            }}
                          >
                            <CheckIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            sx={{
                              backgroundColor: "red",
                              color: "white",
                              borderRadius: "50px",
                            }}
                          >
                            <ClearIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </div>
        <TabPanel value={value} index={1}>
          {/* <ApprovedStudent /> */}
          <div>
            <TotalStudent />
          </div>
        </TabPanel>
        {/* <TabPanel value={value} index={2}>
          Item Three
        </TabPanel> */}
      </Box>
    </>
  );
}
