const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName:{
        type:String,
    },

    lastName:{
        type:String ,
    },

    email:{
        type:String,
    },
    
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    }
});


const user = mongoose.model('user', userSchema);

module.exports = user;
