const User = require('../models/user'); 

exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, dateOfBirth } = req.body;

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            dateOfBirth
        });
        const user = await newUser.save();
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};



exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
       
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (password !== user.password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ message: "Login successful", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};
