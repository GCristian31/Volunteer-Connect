import React from 'react';
import SpeakerImage from '../images/Speaker-Man.png'; 
import NavigationBar from './NavigationBar';
import { useState, useEffect } from 'react';


function About() {

    const [nextEvent, setNextEvent] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/events/next-event')
            .then(response => response.json())
            .then(data => setNextEvent(data))
            .catch(error => console.log('Error fetching data:', error));
    }, []);

    return (
        <>
        <NavigationBar />
        <div className="flex flex-col justify-center min-h-screen bg-pink-200">
            <div className="flex flex-row space-x-8 w-full max-w-6xl mx-auto p-10 bg-pink-50 shadow-lg">
                <div className="w-1/2 space-y-4">
                    <div className='flex justify-start'>
                        <h1 className="text-4xl font-bold text-pink-800">Make a Difference Today!</h1>
                    </div>
                    <div className='flex justify-start pt-2'>
                        <h2 className="text-4xl text-pink-800 font-bold">Join Our Volunteer Team.</h2>
                    </div>
                    <div className='flex justify-start pt-20'>
                        <p className='text-pink-800'>Discover over 100 unique opportunities to make a difference in Timisoara. Your impact starts here.</p>
                    </div>
                    <div className='flex justify-start pt-20'>
                        <p className='text-pink-800 text-2xl font-bold'>The Next Event Will Be:</p>
                    </div>
                </div>
                <div className="w-1/2">
                    <img src={SpeakerImage} alt="Speaker" className="rounded-lg shadow-lg" />
                </div>
            </div>
    
            <div className="w-full max-w-6xl mx-auto">
                <div className="grid grid-cols-4 gap-4 bg-pink-50 shadow-lg">
                    {nextEvent ? (
                        <>
                        <div className="bg-pink-50 p-4 shadow-inner rounded-lg">
                            <h3 className="font-semibold text-gray-700">Location</h3>
                            <p>{nextEvent.location}</p>
                        </div>
                        <div className="bg-pink-50 p-4 shadow-inner rounded-lg">
                            <h3 className="font-semibold text-gray-700">Participants</h3>
                            <p>{nextEvent.maxParticipants} People</p>
                        </div>
                        <div className="bg-pink-50 p-4 shadow-inner rounded-lg">
                            <h3 className="font-semibold text-gray-700">Date and Time</h3>
                            <p>{new Date(nextEvent.dateTime).toLocaleDateString()} at {new Date(nextEvent.dateTime).toLocaleTimeString()}</p>
                        </div>
                        <div className="bg-pink-50 p-4 shadow-inner rounded-lg">
                            <h3 className="font-semibold text-gray-700">Event</h3>
                            <p>{nextEvent.name}</p>
                        </div>
                        </>
                    ) : (
                        <div>Loading event information...</div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
    
}

export default About;
