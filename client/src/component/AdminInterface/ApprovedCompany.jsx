import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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
export default function ApprovedCompany() {
  const [companies, setcompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    async function fetchcompanies() {
      try {
        const response = await axios.get(
          "http://localhost:4000/auth/get_approved_company"
        );
        setcompanies(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchcompanies();
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
  const filteredCompanies = companies.filter((companies) =>
    companies.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchWrapper>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <InputBase
          placeholder="Search by Company Name…"
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
              <StyledTableCell>Useranme</StyledTableCell>
              <StyledTableCell>Comapny Name</StyledTableCell>
              <StyledTableCell>Company Address </StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Zip Code</StyledTableCell>
              <StyledTableCell>Company Logo</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.username}>
                <TableCell>{company.username}</TableCell>
                <TableCell>{company.company_name}</TableCell>
                <TableCell>{company.company_address}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>{company.ph_no}</TableCell>
                <TableCell>{company.zip_code}</TableCell>
                <TableCell>
                  <Avatar
                    sx={{
                      width: "80px",
                      height: "80px",
                      border: "1px solid black",
                    }}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
