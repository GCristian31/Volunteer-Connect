import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import eventImage from "../images/Event-Image.PNG";
import NormalUserMap from './NormalUserMap';

function Event() {
    const [events, setEvents] = useState([]); 
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    useEffect(() => {
      
        const user = localStorage.getItem('user');
        setIsUserLoggedIn(!!user);

        const fetchEvents = async () => {
            const response = await fetch('http://localhost:5000/api/events/all');
            if (response.ok) {
                const data = await response.json();
                setEvents(data);
            } else {
                console.error('Failed to fetch events');
            }
        };

        fetchEvents();
    }, []);

    if (!isUserLoggedIn) {
        return (
            <>
                <NavigationBar />
                <div className="flex items-center justify-center min-h-screen bg-pink-50">
                    <div className="text-xl text-center">
                        <p>Please login to view events.</p>
                        <Link to="/login" className="underline text-blue-600 hover:text-blue-800">
                            Go to Login
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <NavigationBar />
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    {events.map((event) => (
                        <div key={event._id} className="my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/3">
                            <article className="overflow-hidden rounded-lg shadow-lg">
                                <img alt="Event" className="block h-auto w-full" src={eventImage} />
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="text-lg">
                                        <a className="no-underline hover:underline text-black" href="#">
                                            {event.name}
                                        </a>
                                    </h1>
                                </header>

                                <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                                    <div >
                                        <p className="text-grey-darker text-sm">
                                        {event.location}
                                        </p>
                                       
                                        {new Date(event.dateTime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}

                                    </div>

                                 
                                </footer>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
           
            <NormalUserMap />

        </>
    );
}

export default Event;
