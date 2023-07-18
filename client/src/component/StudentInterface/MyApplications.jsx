import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UsernameContext } from "../StudentProfile/contexts/StepperContext";
import Nav4 from "../Nav/Nav4";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const columnDefs = [
  { headerName: "Job ID", field: "job_id", cellRenderer: "cellRenderer" },
  {
    headerName: "Company Name",
    field: "company_name",
    cellRenderer: "cellRenderer",
  },
  { headerName: "Job Name", field: "job_name", cellRenderer: "cellRenderer" },
  { headerName: "Job Type", field: "job_type", cellRenderer: "cellRenderer" },
  { headerName: "Perks", field: "perks", cellRenderer: "cellRenderer" },
  {
    headerName: "Eligibility",
    field: "eligibility",
    cellRenderer: "cellRenderer",
  },
  {
    headerName: "Department",
    field: "department",
    cellRenderer: "cellRenderer",
  },
  { headerName: "Duration", field: "duration", cellRenderer: "cellRenderer" },
  {
    headerName: "Description",
    field: "description",
    cellRenderer: "cellRenderer",
  },
  {
    headerName: "Job Location",
    field: "job_location",
    cellRenderer: "cellRenderer",
  },
  {
    headerName: "Application Status",
    field: "applicationStatus",
    cellRenderer: "cellRenderer",
    cellStyle: { color: "green" },
  },
];

const defaultColDef = {
  sortable: true,
  resizable: true,
  filter: true,
};

export const MyApplications = () => {
  const [rowData, setRowData] = useState([]);
  const [selectedCellData, setSelectedCellData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { username } = useContext(UsernameContext);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/auth/getAppliedJobs/${username}`)
      .then((response) => {
        setRowData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [username]);

  const handleCellClick = (event) => {
    const selectedData = event.data[event.colDef.field];
    setSelectedCellData(selectedData);
    handleDialogOpen();
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleCellDataUpdate = (newData) => {
    // update the rowData with the new data
    // ...
    // close the dialog box
    handleDialogClose();
  };

  const DialogBox = () => (
    <Dialog open={isDialogOpen} onClose={handleDialogClose}>
      <DialogTitle style={{ backgroundColor: "#f50057", color: "#fff" }}>
        Cell Data
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" style={{ marginBottom: 16 }}>
          {selectedCellData}
        </Typography>
      </DialogContent>
    </Dialog>
  );

  const frameworkComponents = {
    cellRenderer: (props) => (
      <div onClick={() => handleCellClick(props)}>{props.value}</div>
    ),
  };

  return (
    <>
      <Nav4 />
      <div
        className="ag-theme-alpine"
        style={{ height: 400, width: "100%", paddingLeft: "16%" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={rowData}
          frameworkComponents={frameworkComponents}
        />
      </div>
      <DialogBox />
    </>
  );
};
