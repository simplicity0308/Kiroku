const userModel = require('../models/User.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            } else {
                return res.status(200).json({ message: 'Login successful', userId: user.userId });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

// helper functions


module.exports = {
    login
}