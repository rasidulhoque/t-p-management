import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Nav_company from "../Nav/Nav_company";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
const styles = {
  dialogTitle: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.5rem",
    padding: "1rem",
  },
  dialogContent: {
    paddingTop: "2rem",
    paddingBottom: "1rem",
  },
  textField: {
    marginBottom: "1.5rem",
  },
  dialogActions: {
    padding: "1rem",
    borderTop: "1px solid #ddd",
  },
  cancelButton: {
    color: "#f44336",
  },
  submitButton: {
    color: "#fff",
    backgroundColor: "#3f51b5",
    marginLeft: "1rem",
  },
};
export const AppliedStudents = (props) => {
  const { job_id } = useParams();
  const [rowData, setRowData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/auth/getStudentDetailsForTable/${job_id}`)
      .then((response) => {
        setRowData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [job_id]);

  const columnDefs = [
    { headerName: "#", valueGetter: "node.rowIndex + 1", width: 50 },
    { headerName: "Email", field: "email" },
    { headerName: "First Name", field: "firstName" },
    { headerName: "Last Name", field: "lastName" },
    { headerName: "Department", field: "department" },
    { headerName: "Course", field: "course" },
    // { headerName: "College", field: "college" },
    { headerName: "Batch", field: "batch" },
    { headerName: "Phone Number", field: "ph_no" },
    { headerName: "Institute", field: "institute" },
    {
      headerName: "Accept",
      field: "accept",
      cellRendererFramework: (params) => (
        <Button
        variant="contained"
        disabled={params.data.status === "Accepted"}
        onClick={() => {
          console.log(params.data);
          axios
            .put(`http://localhost:4000/auth/acceptStudent/${job_id}/${params.data.username}`)
            .then((response) => {
              console.log("Accepted student");
              alert(response.data.message);
            })
            .catch((error) => {
              console.error(error);
            });
        }}
        style={{
          backgroundColor: params.data.status === "Accepted" ? "grey" : "green",
        }}
      >
        Select
      </Button>
      ),
    },
    {
      headerName: "Reject",
      field: "reject",
      cellRendererFramework: (params) => (
        <Button
          variant={"contained"}
          onClick={() => {
            console.log(`Rejected student with ID: ${params.data.id}`);
          }}
          style={{ backgroundColor: "red" }}
        >
          Reject
        </Button>
      ),
    },
    {
      headerName: "Application Status",
      field: "applicationStatus",
      cellRendererFramework: (params) => (
        <Button
          variant={"contained"}
          onClick={() => {
            setSelectedStudent(params.data);
            setOpen(true);
          }}
        >
          {params.data.applicationStatus
            ? params.data.applicationStatus
            : "Add Status"}
        </Button>
      ),
    },
  ];

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent({});
    setStatus("");
  };

  const handleSubmit = () => {
    axios
      .put(
        `http://localhost:4000/auth/ApplicationStatus/${job_id}/${selectedStudent.username}`,
        { applicationStatus: status }
      )
      .then((response) => {
        alert(response.data.message);
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Nav_company />
      <div
        className="ag-theme-alpine"
        style={{ height: 600, width: "100%", paddingLeft: "15%" }}
      >
        <input
          type="search"
          placeholder="Search by name or email"
          onChange={handleSearchTextChange}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "8px 12px",
            border: "2px solid #ccc",
            borderRadius: "20px",
            fontSize: "1rem",
            fontFamily: "Arial, sans-serif",
            outline: "none",
            boxShadow: "none",
            transition: "border-color 0.2s ease",
          }}
          className="search-bar"
        />

        <AgGridReact
          rowData={rowData.filter(
            (data) =>
              data.email.includes(searchText) ||
              `${data.firstName} ${data.lastName}`.includes(searchText)
          )}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={styles.dialogTitle}>
          Add Application Status
        </DialogTitle>
        <DialogContent style={styles.dialogContent}>
          <TextField
            autoFocus
            margin="dense"
            label="Application Status"
            fullWidth
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            style={styles.textField}
          />
          <hr style={{ margin: "0" }} />
        </DialogContent>
        <DialogActions style={styles.dialogActions}>
          <Button onClick={handleClose} style={styles.cancelButton}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} style={styles.submitButton}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
