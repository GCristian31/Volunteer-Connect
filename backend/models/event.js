const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    maxParticipants: {
        type: Number,
        required: true
    },
    joinedParticipants:{
        type:Number,
    },
    latLng:{
        type:String,
    },

    
});

const event = mongoose.model('Event', eventSchema);

module.exports = event;
