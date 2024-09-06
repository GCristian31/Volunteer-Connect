import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'moment/locale/en-gb';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('en-gb');
const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events/all');
        const apiEvents = response.data.map(event => ({
          ...event,
          title: event.name,
          start: new Date(event.dateTime),
          end: new Date(event.dateTime) 
        }));
        setEvents(apiEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        culture='en-GB'
      />
    </div>
  );
}

export default MyCalendar;
