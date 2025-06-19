const express = require('express');
const { addUser } = require('../controllers/User.controller.js');
const { login, checkDuplicateUsername, logout } = require('../controllers/Auth.controller.js');
const { checkToken } = require('../middleware/tokenAuth.js');
const router = express.Router();

// Route to add new user
router.post('/addUser', addUser);

// Route for user login
router.post('/login', login);

// Route to check duplicate username for registering
router.get('/checkDuplicateUsername/:username', checkDuplicateUsername)

// Route to logout user
router.post('/logout', logout);

// Export the router
module.exports = router;