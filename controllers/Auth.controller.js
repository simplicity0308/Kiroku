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

                res.cookie('token', token, {
                    httpOnly: true, //prevent client side js to access cookie
                    secure: process.env.NODE_ENV === 'production', //use secure cookies in production
                    sameSite: 'Strict', //prevent CSRF attacks
                    maxAge: 20 * 60 * 1000 //20 minutes in milliseconds, this is how long will the browser will wait before nuke the token
                })

                return res.status(200).json({ 
                    message: 'Login successful', 
                    userId: user.userId, 
                    username: user.username,
                    // token: token -> not needed since now stored in cookie above
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

const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });
    console.log('User logged out, cookie cleared');
    return res.status(200).json({ message: 'Logout successful' });
}


module.exports = {
    login,
    logout,
    checkDuplicateUsername
}   




