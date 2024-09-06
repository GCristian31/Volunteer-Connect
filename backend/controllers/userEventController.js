const UserEvent = require('../models/userEvent');
const Event = require('../models/event'); 
const User = require("../models/user");


exports.createUserEvent = async (req, res) => {
    try {
        const { userId, eventName } = req.body;
     
        const event = await Event.findOne({ name: eventName });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        event.joinedParticipants = (event.joinedParticipants || 0) + 1;
        await event.save();

        const newUserEvent = new UserEvent({
            userId,
            eventName
        });

        const userEvent = await newUserEvent.save();
        res.status(201).json({ message: "UserEvent created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

exports.getEventsByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const userEvents = await UserEvent.find({ userId: userId });
        const eventNames = userEvents.map(event => event.eventName);
        res.status(200).json(eventNames);
    } catch (error) {
        console.error('Failed to fetch events:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};


exports.getUsersByEventName = async (req, res) => {
    try {
        const { eventName } = req.body;
        const userEvents = await UserEvent.find({ eventName: eventName })
            .populate({
                path: 'userId',
                select: 'firstName lastName email'
            });

        if (!userEvents.length) {
            return res.status(404).json({ message: "No users found for this event" });
        }

        const users = userEvents.map(event => event.userId);
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

