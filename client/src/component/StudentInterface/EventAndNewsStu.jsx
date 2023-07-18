import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import Nav4 from "../Nav/Nav4";

const StyledTableContainer = styled(TableContainer)`
  margin-top: 2rem;
`;

const StyledTableCell = styled(TableCell)`
  color: black;
  font-weight: bold;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: white;
  }
`;

const StyledTableCellDescription = styled(StyledTableCell)`
  padding: 1rem;
  white-space: pre-line;
  width: 40%;
`;

export const EventAndNewsStu = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:4000/auth/getAllEvents");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = dateObj.toLocaleDateString(undefined, options);
    return formattedDate;
  };

  return (
    <>
    <Nav4/>
      <div style={{ maxWidth: "800px", margin: "0 auto", paddingTop: "20px" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ fontFamily: "sans-serif" }}
        >
          Event Details
        </Typography>

        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <StyledTableRow style={{ backgroundColor: "#4caf50" }}>
                <StyledTableCell align="center">Event ID</StyledTableCell>
                <StyledTableCell align="center">Event Name</StyledTableCell>
                <StyledTableCell align="center">Venue</StyledTableCell>
                <StyledTableCell align="center">Starting Date</StyledTableCell>
                <StyledTableCell align="center">End Date</StyledTableCell>
                <StyledTableCell align="center">Description</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <StyledTableRow key={event.event_id}>
                  <StyledTableCell align="center">
                    {event.event_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {event.event_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {event.venue}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {formatDate(event.starting_date)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {formatDate(event.end_date)}
                  </StyledTableCell>
                  <StyledTableCellDescription align="center">
                    {event.desc}
                  </StyledTableCellDescription>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </div>
    </>
  );
};
