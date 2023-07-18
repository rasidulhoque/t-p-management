import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { useState, useEffect } from "react";
import ApprovedCompany from "./ApprovedCompany";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { Avatar } from "@mui/material";
import {
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  IconButton,
} from "@mui/material";
import { TableContainer } from "@mui/material";
import { Paper } from "@mui/material";
import { Table } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Nav from "../Nav/Nav";
import Admin from "../Nav/Admin";
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
export default function Approve_Company() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [companies, setcompanies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/auth/getCompanies")
      .then((response) => {
        setcompanies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleApprove = (username) => {
    axios
      .put("http://localhost:4000/auth/approve_company", {
        username: username,
        status: "approved",
      })
      .then((res) => {
        console.log(res.data);
        // Remove the approved company from the table
        setcompanies((prevcompanies) => {
          return prevcompanies.filter((company) => {
            return company.username !== username;
          });
        });
        // Show the approval message
        alert("Company approved!");
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
            {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
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
                  <StyledTableCell>Username</StyledTableCell>
                  <StyledTableCell>Company Name</StyledTableCell>
                  <StyledTableCell>Company Address</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Phone Number</StyledTableCell>
                  <StyledTableCell>Zip Code</StyledTableCell>
                  <StyledTableCell>Licence</StyledTableCell>
                  <StyledTableCell>Logo</StyledTableCell>
                  <StyledTableCell>Approve</StyledTableCell>
                  <StyledTableCell>Reject</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companies.map((company) => {
                  console.log(company.company_licence,"please aa jau");
                  return (
                    <TableRow key={company.username}>
                      <TableCell>{company.username}</TableCell>
                      <TableCell>{company.company_name}</TableCell>
                      <TableCell>{company.company_address}</TableCell>
                      <TableCell>{company.email}</TableCell>
                      <TableCell>{company.ph_no}</TableCell>
                      <TableCell>{company.zip_code}</TableCell>
                      <TableCell>
                        <Avatar
                          sx={{ width: "80px", height: "80px", border: "1px solid black"}}
                          alt="j"
                          src={`http://localhost:4000/assets/${company.company_licence}`}
                          onClick={() =>
                            window.open(
                              `http://localhost:4000/assets/${company.company_licence}`,
                              "_blank"
                            )
                          }
                          title="Click to view file"
                        />
                      </TableCell>
                      <TableCell>
                        <Avatar
                          sx={{ width: "80px", height: "80px", border: "1px solid black"}}
                          alt="j"
                          src={`http://localhost:4000/assets/${company.logo}`}
                          onClick={() =>
                            window.open(
                              `http://localhost:4000/assets/${company.logo}`,
                              "_blank"
                            )
                          }
                          title="Click to view file"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleApprove(company.username)}
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
        <TabPanel value={value} index={1}>
          <ApprovedCompany />
        </TabPanel>
        {/* <TabPanel value={value} index={2}>
          Item Three
        </TabPanel> */}
      </Box>
    </>
  );
}
