const User = require('../models/user');

exports.createAdmin = async function createAdmin() {
    try {
        const ifExists = await User.findOne({ email: 'admin@gmail.com' });
        
        if (!ifExists) {
            const admin = new User({
                firstName: "admin",
                lastName: "admin",
                email: "admin@gmail.com",
                password: "admin",
                dateOfBirth: "2000-12-07"
            });

            await admin.save();
        }
    } catch (error) {
        console.error('Failed to create admin:', error);
    }
};
