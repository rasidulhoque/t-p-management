import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import Admin from "../Nav/Admin";

export const EventList = () => {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    event_id: "",
    event_name: "",
    venue: "",
    starting_date: "",
    end_date: "",
    desc: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/auth/getAllEvents"
      );
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEventDetails({
      event_id: "",
      event_name: "",
      venue: "",
      starting_date: "",
      end_date: "",
      desc: "",
    });
  };

  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = async () => {
    try {
      await axios.post("http://localhost:4000/auth/event_detail", eventDetails);
      fetchEvents();
      handleDialogClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEvent = async (event_id) => {
    try {
      await axios.delete(`http://localhost:4000/auth/deleteEvent/${event_id}`);
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Admin />
      <Container sx={{ marginLeft: "16%" }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Event List
        </Typography>
        <List>
          {events.length > 0 ? (
            events.map((event) => (
              <ListItem key={event.event_id}>
                <ListItemText
                  primary={event.event_name}
                  secondary={`${event.venue}, ${event.starting_date} - ${event.end_date}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteEvent(event.event_id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <Typography variant="body1">No events found.</Typography>
          )}
        </List>
        <IconButton color="primary" onClick={handleDialogOpen}>
          <Add />
        </IconButton>
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Create Event</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="event_id"
              label="Event ID"
              type="text"
              fullWidth
              value={eventDetails.event_id}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="event_name"
              label="Event Name"
              type="text"
              fullWidth
              value={eventDetails.event_name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="venue"
              label="Venue"
              type="text"
              fullWidth
              value={eventDetails.venue}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="starting_date"
              label="Starting Date"
              type="date"
              fullWidth
              value={eventDetails.starting_date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              name="end_date"
              label="End Date"
              type="date"
              fullWidth
              value={eventDetails.end_date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              name="desc"
              label="Description"
              type="text"
              fullWidth
              value={eventDetails.desc}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleCreateEvent} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};
 