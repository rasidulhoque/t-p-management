// import * as React from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import { Grid, Typography } from "@mui/material";
// import { useState, useEffect } from "react";
// import { Button, Paper } from "@mui/material";
// import AddCircleIcon from "@mui/icons-material/AddCircle";

// export const Departments = () => {
//   const [departments, setDepartments] = useState([""]);

//   const handleAddDepartment = () => {
//     setDepartments([...departments, ""]);
//   };

//   const handleDepartmentChange = (index, value) => {
//     const newDepartments = [...departments];
//     newDepartments[index] = value;
//     setDepartments(newDepartments);
//   };
//   return (
//     <>
//       <Grid container spacing={2}>
//         <Grid
//           item
//           xs={12}
//           sx={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
//         >
//           <Typography variant="h5">Add Departments</Typography>
//         </Grid>

//         {departments.map((department, index) => (
//           <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
//             <Box
//               component="form"
//               sx={{
//                 padding: "20px",
//               }}
//               noValidate
//               autoComplete="off"
//             >
//               <TextField
//                 id={`department-${index}`}
//                 label="Department"
//                 variant="outlined"
//                 sx={{ width: "50vw" }}
//                 value={department}
//                 onChange={(event) =>
//                   handleDepartmentChange(index, event.target.value)
//                 }
//               />
//               {index === departments.length - 1 && (
//                 <Button
//                   onClick={handleAddDepartment}
//                   sx={{ marginLeft: "20px" }}
//                 >
//                   <AddCircleIcon sx={{ fontSize: "3rem" }} />
//                 </Button>
//               )}
//             </Box>
//           </Grid>
//         ))}
//         <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
//           <Button variant="contained">Submit</Button>
//         </Grid>
//       </Grid>

//       <Grid sx={{ display: "flex", justifyContent: "center", marginTop: "80px", paddingBottom:"20px" }}>
//         <Typography variant="h5" color="initial">
//           All Departments
//         </Typography>
//       </Grid>
//       <Grid sx={{display:"flex", justifyContent:"center"}}>
//       <Paper elevation={12} sx={{ minHeight: "700px", width:"50vw" }}>
//         <div style={{ display: "flex", justifyContent: "space-around" }}>
//           <TextField sx={{ width: "80%", marginTop: "40px" }}>
//             {}dfdkfjngj
//           </TextField>
//         </div>
//       </Paper>
//       </Grid>

//     </>
//   );
// };

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Button, Paper } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Admin from "../Nav/Admin";

export const Departments = () => {
  const [departments, setDepartments] = useState([""]);
  const [allDepartments, setAllDepartments] = useState([]);

  const handleAddDepartment = () => {
    setDepartments([...departments, ""]);
  };

  const handleDepartmentChange = (index, value) => {
    const newDepartments = [...departments];
    newDepartments[index] = value;
    setDepartments(newDepartments);
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:4000/auth/add_departments", { departments })
      .then((response) => {
        console.log(response.data);
      })

      .catch((error) => {
        console.error(error);
      });
    window.location.reload();
    console.log(departments, "dhgfhd");
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/auth/get_departments")
      .then((response) => {
        setAllDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleDeleteDepartment = (department) => {
    axios
      .delete(`http://localhost:4000/auth/delete_department/${department}`)
      .then((response) => {
        console.log(response.data);
        // Update the list of departments after successful deletion
        setAllDepartments(
          allDepartments.filter(
            (department) => department.department !== department
          )
        );
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
    <Admin/>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <Typography variant="h5">Add Departments</Typography>
        </Grid>

        {departments.map((department, index) => (
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
            key={`department-${index}`}
          >
            <Box
              component="form"
              sx={{
                padding: "20px",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id={`department-${index}`}
                label="Department"
                variant="outlined"
                sx={{ width: "50vw" }}
                value={department}
                onChange={(event) =>
                  handleDepartmentChange(index, event.target.value)
                }
              />
              {index === departments.length - 1 && (
                <Button
                  onClick={handleAddDepartment}
                  sx={{ marginLeft: "20px" }}
                >
                  <AddCircleIcon sx={{ fontSize: "3rem" }} />
                </Button>
              )}
            </Box>
          </Grid>
        ))}
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>

      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "80px",
          paddingBottom: "20px",
        }}
      >
        <Typography variant="h5" color="initial">
          All Departments
        </Typography>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "100px",
        }}
      >
        <Paper elevation={12} sx={{ minHeight: "700px", width: "50vw" }}>
          {allDepartments.map((department) => (
            <Box
              sx={{
                padding: "20px",
                margin: "60px",
                border: "1px solid black",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography>{department.department}</Typography>
              <IconButton
                onClick={() => handleDeleteDepartment(department.department)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Paper>
      </Grid>
    </>
  );
};
