import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyCalendar from './MyCalendar';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';

function LocationMarker({ fetchEvents }) {  
  const [position, setPosition] = useState(null);

  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  
  const [form, setForm] = useState({
    name: '',
    location: '',
    dateTime: '',
    maxParticipants: '',
    latLng: ''
  });

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setForm(form => ({ ...form, latLng: `${lat.toFixed(6)}, ${lng.toFixed(6)}` }));
    }
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = {
      name: form.name,
      location: form.location,
      dateTime: form.dateTime + ":00.000Z",
      maxParticipants: parseInt(form.maxParticipants),
      latLng: form.latLng,
      email:user.email

    };

    try {
      const response = await fetch('http://localhost:5000/api/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Event created successfully!');
        setPosition(null);
        fetchEvents();  
      } else {
        throw new Error(data.message || 'Failed to create event');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error creating event');
    }
  };

  return position === null ? null : (
    <Marker position={position}>
      <Popup minWidth={280}>
        <div className="p-4 space-y-2">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="name" className="font-semibold">Name:</label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} className="p-2 border border-gray-300 rounded" />

            <label htmlFor="location" className="font-semibold">Location:</label>
            <input type="text" id="location" name="location" value={form.location} onChange={handleChange} className="p-2 border border-gray-300 rounded" />

            <label htmlFor="dateTime" className="font-semibold">Date and Time:</label>
            <input type="datetime-local" id="dateTime" name="dateTime" value={form.dateTime} onChange={handleChange} className="p-2 border border-gray-300 rounded" />

            <label htmlFor="maxParticipants" className="font-semibold">Max Participants:</label>
            <input type="number" id="maxParticipants" name="maxParticipants" value={form.maxParticipants} onChange={handleChange} className="p-2 border border-gray-300 rounded" />

            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Create Event</button>
          </form>
        </div>
      </Popup>
    </Marker>
  );
}

function EventsMap() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events/all');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      toast.error('Failed to load events.');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <NavigationBar />
      <ToastContainer />

      {!user ? (
        <div className="flex items-center justify-center min-h-screen bg-pink-50">
          <div className="text-xl text-center">
            <p>Please login to add an event.</p>
            <Link to="/login" className="underline text-blue-600 hover:text-blue-800">
              Go to Login
            </Link>
          </div>
        </div>
      ) : user.password !== "admin" ? (
        <div className="flex items-center justify-center min-h-screen bg-pink-50">
          <div className="text-xl text-center">
            <p>Only admin can access this page!</p>
          </div>
        </div>
      ) : (
        <>

      <MapContainer center={[45.7489, 21.2087]} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {events.map(event => (
          <Marker key={event._id} position={event.latLng.split(', ').map(Number)}>
            <Popup>
              <div className="p-3 bg-white rounded-lg shadow-xl">
                <h3 className="text-lg font-bold text-blue-700">{event.name}</h3>
                <p className="text-sm text-gray-600">{event.location}</p>
                <p className="text-sm text-gray-500">Max Participants: {event.maxParticipants}</p>
                <p className="text-xs text-gray-400">{new Date(event.dateTime).toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        <LocationMarker fetchEvents={fetchEvents} />  
      </MapContainer>

      <MyCalendar />
      </>
      )}
      
    </>
  );
}

export default EventsMap;
