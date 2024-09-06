import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyCalendar from './MyCalendar';
import axios from 'axios';

function LocationMarker({ fetchEvents }) {
  const [position, setPosition] = useState(null);


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



}

function NormalUserMap() {
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
      // fetchUserEvents();
    } catch (error) {
      console.error('Failed to fetch events:', error);
      toast.error('Failed to load events.');
    }
  };

  const fetchUserEvents = async () => {
    fetchEvents();
   
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      try {
        const response = await fetch(`http://localhost:5000/api/user-event/events/${user._id}`);
        const userEvents = await response.json();
        
        localStorage.setItem('userEvents', JSON.stringify(userEvents));
      } catch (error) {
        console.error('Failed to fetch user events:', error);
      }
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchUserEvents();
  }, []);


  const handleUserCreateEvent = async (eventName) => {

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const userId = user._id;

      try {
        const response = await axios.post('http://localhost:5000/api/user-event/create', {
          userId,
          eventName
        });

        fetchUserEvents();
        fetchEvents();
      
      } catch (error) {
        console.error('Error joining event:', error);

      }
    } else {
      console.log('User data not found');

    }
  };


  return (
    <>

      <>

        <MapContainer center={[45.7489, 21.2087]} zoom={13} style={{ height: '100vh', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {events.map(event => {
            const userEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');
            const hasJoined = userEvents.includes(event.name);
            const isFull = event.joinedParticipants >= event.maxParticipants;

            return (
              <Marker key={event._id} position={event.latLng.split(', ').map(Number)}>
                <Popup>
                  <div className="p-3 bg-white rounded-lg shadow-xl">
                    <h3 className="text-lg font-bold text-blue-700">{event.name}</h3>
                    <p className="text-sm text-gray-600">{event.location}</p>
                    <p className="text-sm text-gray-500">Max Participants: {event.maxParticipants}</p>
                    <p className="text-sm text-gray-500">Participants: {event.joinedParticipants}</p>
                    <p className="text-xs text-gray-400">{new Date(event.dateTime).toLocaleString()}</p>
                    <button
                      onClick={() => !hasJoined && !isFull && handleUserCreateEvent(event.name)}
                      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ${hasJoined || (isFull && !hasJoined) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={hasJoined || (isFull && !hasJoined)}>
                      {hasJoined ? 'Joined Event' : isFull ? 'Event Full' : 'Join Event'}
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}



          <LocationMarker fetchEvents={fetchEvents} />
        </MapContainer>

        <MyCalendar />
      </>

    </>
  );
}

export default NormalUserMap;
