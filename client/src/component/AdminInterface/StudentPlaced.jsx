import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Paper, TextField } from "@mui/material";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "none",
        },
        head: {
          color: "blue", // Set the heading color to blue
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(even)": {
            backgroundColor: "#fafafa",
          },
        },
      },
    },
  },
});

export const StudentPlaced = () => {
  const [rowData, setRowData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/auth/getAcceptedStudnt",
        {
          params: {
            search: searchTerm,
          },
        }
      );
      setRowData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const columnDefs: ColDef[] = [
    { field: "firstName", headerName: "First Name", filter: true },
    { field: "lastName", headerName: "Last Name", filter: true },

    { field: "job_name", headerName: "Job Name" },
    { field: "job_type", headerName: "Job Type" },
    { field: "perks", headerName: "Perks" },
    { field: "company_name", headerName: "Company Name" },
    { field: "duration", headerName: "Duration" },
    { field: "job_location", headerName: "Job Location" },
    { field: "company_address", headerName: "Company Address" },
    { field: "email", headerName: "Student Email" },
    { field: "dob", headerName: "Student Date of Birth" },
    { field: "gender", headerName: "Student Gender" },
    { field: "department", headerName: "Student Department" },
    { field: "course", headerName: "Student Course" },
    { field: "batch", headerName: "Student Batch" },
    { field: "ph_no", headerName: "Student Phone Number" },
    { field: "address", headerName: "Student Address" },
    { field: "sem", headerName: "Student Semester" },
    { field: "marks", headerName: "Student Aggregate Percentage" },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "500px", width: "100%", marginTop: "2rem" }}>
      <ThemeProvider theme={theme}>
        <Paper style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
          <TextField
            label="Search Student Name..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ margin: "1rem", borderRadius: "8px" }}
          />

          <div style={{ flex: 1 }}>
            <AgGridReact rowData={rowData} columnDefs={columnDefs} quickFilterText={searchTerm} />
          </div>
        </Paper>
      </ThemeProvider>
    </div>
  );
};
