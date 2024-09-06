import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString); 
      setIsLoggedIn(true);
      setIsAdmin(user.password === "admin");
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    localStorage.removeItem("userEvents");
    setIsLoggedIn(false); 
    setIsAdmin(false); 
    navigate('/login'); 
  };

  return (
    <div className="bg-pink-300 p-2">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex space-x-4">
          <Link to="/about" className="bg-pink-800 text-white px-3 py-1.5 rounded-xl hover:bg-purple-700 transition duration-300">About</Link>
          <Link to="/events" className="bg-pink-800 text-white px-3 py-1.5 rounded-xl hover:bg-purple-700 transition duration-300">Events</Link>
          <Link to="/contact" className="bg-pink-800 text-white px-3 py-1.5 rounded-xl hover:bg-purple-700 transition duration-300">Contact</Link>
          
          {isAdmin && (
            <Link to="/add-event" className="bg-pink-800 text-white px-3 py-1.5 rounded-xl hover:bg-purple-700 transition duration-300">Add Event</Link>
          )}

          {isAdmin && (
            <Link to="/event-participants" className="bg-pink-800 text-white px-3 py-1.5 rounded-xl hover:bg-purple-700 transition duration-300">View Participants</Link>
          )}
          {isAdmin && (
            <Link to="/add-admin" className="bg-pink-800 text-white px-3 py-1.5 rounded-xl hover:bg-purple-700 transition duration-300">Add Admin</Link>
          )}
        </div>

        {isLoggedIn ? (
          <button onClick={handleLogout} className="bg-pink-500 text-white px-3 py-1.5 rounded-xl hover:bg-pink-700 transition duration-300">
            Logout
          </button>
        ) : (
          <Link to="/login" className="bg-pink-500 text-white px-3 py-1.5 rounded-xl hover:bg-pink-700 transition duration-300">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavigationBar;
