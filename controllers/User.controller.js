const userModel = require('../models/User.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const addUser = async (req, res) => {
    let {username, UnhPassword} = req.body;

    console.log(`password before hash: ${UnhPassword}`);
    const password = await bcrypt.hash(UnhPassword, saltRounds);

    try {
        let lastUser = await userModel.findOne().sort({ userId: -1 });
        let newUserId = lastUser ? lastUser.userId + 1 : 1;  
        console.log(`New user: ${username}, ID: ${newUserId}`);
        console.log(`password after hash: ${password}`);
        const newUser = new userModel({userId: newUserId, username, password });

        const saveUser = await newUser.save();
        if (!saveUser) {
            return res.status(500).json({ error: 'Failed to save user' });
        } else {
            return res.status(201).json({ message: 'User added successfully', userId: newUserId });
        }
    } catch (error) {
        console.error('Error adding user:', error);
        return res.status(500).json({ error: 'Failed to find last user' });
    }
}

// const updateUser 

module.exports = {
    addUser
}