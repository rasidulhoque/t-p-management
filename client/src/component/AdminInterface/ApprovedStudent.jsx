import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Admin from "../Nav/Admin";
import { Delete } from "@mui/icons-material";
const SearchWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#F6F6F6",
  padding: "0.5rem",
  borderRadius: "0.5rem",
  border: "1px solid black",
  marginBottom: "1rem",
});

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginRight: "0.5rem",
}));

export default function ApprovedStudent() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get(
          "http://localhost:4000/auth/get_approved_students"
        );
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStudents();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const filteredStudents = students.filter((student) =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const removeStudent = (username) => {
    const updatedStudents = students.filter((student) => student.username !== username);
    setStudents(updatedStudents);
  };
  return (
    <>
      <Admin />
      <div style={{marginLeft:"16%", width:"83vw"}}>
        <SearchWrapper>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <InputBase
            placeholder="Search by First Name…"
            inputProps={{ "aria-label": "search" }}
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
          />
        </SearchWrapper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell>Last Name</StyledTableCell>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell>Phone Number</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Course</StyledTableCell>
                <StyledTableCell>Registration Number</StyledTableCell>
                <StyledTableCell>Resume</StyledTableCell>
                <StyledTableCell>Profile Pic</StyledTableCell>
                <StyledTableCell>Remove Student</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
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
                    <Button
                      variant="contained"
                      startIcon={<Delete />}
                      onClick={() => removeStudent(student.username)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
