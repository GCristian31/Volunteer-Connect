const mongoose = require('mongoose');

const userEventSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    eventName: {
        type: String,
        required: true,
        trim: true
    }
});

const userEvent = mongoose.model('userEvent', userEventSchema);

module.exports = userEvent;