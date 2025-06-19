const userModel = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

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

                // generate jwt token
                const token = jwt.sign({
                    userId: user.userId,
                    username: user.username
                }, process.env.JWT_SECRET, {
                    expiresIn: '20minutes' 
                })

                console.log(`Back: JWT token generated for user ${username}: ${token}`);

                return res.status(200).json({ 
                    message: 'Login successful', 
                    userId: user.userId, 
                    username: user.username,
                    token: token
                });
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




