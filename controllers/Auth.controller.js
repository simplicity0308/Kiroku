const userModel = require('../models/User.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            console.log(`Back: User ${username} does not exist`);
            return res.status(401).json({ message: 'User does not exist' });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            } else {
                console.log(`Back: User ${username} logged in successfully`);
                console.log(`Back: User ID: ${user.userId}`);
                console.log(`Back: Username: ${user.username}`);
                return res.status(200).json({ message: 'Login successful', userId: user.userId, username: user.username});
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

const checkDuplicateUsername = async (req, res) => {
    const { username } = req.query;

    try {
        const user = await userModel.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username already exists' });
        } else {
            return res.status(200).json({ message: 'Username is available' });
        }
    }  catch (error) {
        console.error('Error checking duplicate username:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
// helper functions



module.exports = {
    login,
    checkDuplicateUsername
}   




