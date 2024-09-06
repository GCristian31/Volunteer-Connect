
const Event = require('../models/event');
const sendEventCreationEmail = require("../utils/sendEventCreationEmails");

exports.create = async (req, res) => {
    try {
        const { name, location, dateTime, maxParticipants, latLng, email } = req.body;
        const joinedParticipants = 0;
      
        const eventDate = new Date(dateTime).toLocaleString();
        
        const emailBody = `
            <h1>Event Created Successfully</h1>
            <p>Hello,</p>
            <p>We are pleased to inform you that a new event has been successfully created in the system.</p>
            <p><strong>Event Details:</strong></p>
            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Location:</strong> ${location}</li>
                <li><strong>Date and Time:</strong> ${eventDate}</li>
                <li><strong>Maximum Participants:</strong> ${maxParticipants}</li>
               
            </ul>
            <p>Thank you for using our system to manage your events.</p>
            <p>Best Regards,<br>Your Event Management Team</p>
        `;

        
        await sendEventCreationEmail({
            email: email,
            subject: "Event Created Successfully",
            message: emailBody
        });
        const newEvent = new Event({
            name,
            location,
            dateTime: new Date(dateTime),
            maxParticipants,
            joinedParticipants,
            latLng
        });

        await newEvent.save();
        res.status(201).send({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};


exports.getEventById = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};


exports.getNextEvent = async (req, res) => {
    try {
        const now = new Date();
        const nextEvent = await Event.findOne({
            dateTime: { $gte: now } 
        })
        .sort({ dateTime: 1 }) 
        .limit(1); 

        if (!nextEvent) {
            return res.status(404).json({ message: "No upcoming events found" });
        }

        res.status(200).json(nextEvent);
    } catch (error) {
        console.error("Failed to fetch the next event:", error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};




exports.deleteEventById = async (req, res) => {
    try {
        const eventId = req.params.id;
        const result = await Event.findByIdAndDelete(eventId);
        if (!result) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(204).json({ message: "Event deleted successfully"});  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};


exports.updateEventById = async (req, res) => {
    try {
        const eventId = req.params.id;
        const updateData = {};
        if (req.body.name) updateData.name = req.body.name;
        if (req.body.location) updateData.location = req.body.location;
        if (req.body.dateTime) updateData.dateTime = new Date(req.body.dateTime); 
        if (req.body.maxParticipants) updateData.maxParticipants = req.body.maxParticipants;
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update" });
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, { new: true, runValidators: true });

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};



exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

