import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';

const ViewParticipants = () => {
    const eventName = sessionStorage.getItem('eventName') || 'Event not specified';
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/user-event/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ eventName })
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data.users);
            } else {
                console.error('Failed to fetch users');
                
                const errorData = await response.text();
                console.error('Server responded with:', errorData);
            }
        };

        fetchData();
    }, [eventName]);

    return (
        <>
        <NavigationBar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">Event: {eventName}</h1>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {users.length > 0 ? (
                            users.map(user => (
                                <li key={user._id} className="px-6 py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{user.firstName} {user.lastName}</p>
                                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="px-6 py-4 text-center text-sm text-gray-500">
                                No participants found.
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ViewParticipants;
