// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';


  
// export const EventCalender = () => {
//     const [events, setEvents] = useState([]);
//     console.log(events);

//     useEffect(() => {
//       axios.get('http://localhost:4000/auth/calender_event')
//         .then(response => {
//           setEvents(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching events:', error);
//         });
//     }, []);

//   return (
//     <FullCalendar
//     plugins={[ dayGridPlugin ]}
//     initialView="dayGridMonth"
//     events={events}
    
//     eventTimeFormat={{
//       hour: 'numeric',
//       minute: '2-digit',
//       meridiem: false
//     }}
//     eventRender={(info) => (
//       <div>
//         <div>{info.event.start.toLocaleDateString()}</div>
//         <div>{info.event.title}</div>
//       </div>
//     )}
//     eventContent={(info) => (
//       <div style={{ fontWeight: 'bold' }}>
//         {info.event.title}
//       </div>
//     )}
//   />
//   );
// };

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Dialog } from '@mui/material';

export const EventCalender = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/auth/calender_event')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleEventClick = (eventClickInfo) => {
    setSelectedEvent(eventClickInfo.event.title);
  }

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  }

  return (
    <>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={events}
        showNonCurrentDates={false}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: false
        }}
        eventRender={(info) => {
          const eventTitle = info.event.title;
          const maxTitleLength = Math.floor((info.el.offsetWidth - 10) / 8); // calculate the maximum number of characters that can fit in the cell
          const truncatedTitle = eventTitle.length > maxTitleLength ? eventTitle.slice(0, maxTitleLength - 3) + "..." : eventTitle; // truncate the title if it exceeds the maximum length
          return (
            <div style={{ fontSize: '12px', padding: '2px' }}>
              <div>{truncatedTitle}</div>
            </div>
          );
        }}
        eventClick={handleEventClick}
        contentHeight="auto"
        aspectRatio={1.2}
        headerToolbar={{
          start: '',
          center: 'title',
          end: 'prev,next'
        }}
        eventTextColor="#FFFFFF"
        eventBackgroundColor="#2196F3"
        eventBorderColor="#2196F3"
        eventPadding={2}
      />

      <Dialog open={selectedEvent !== null} onClose={handleCloseDialog}>
        <div style={{ padding: '16px' }}>
          <h3>{selectedEvent}</h3>
        </div>
      </Dialog>
    </>
  );
};


