const express = require('express');
const { addUser } = require('../controllers/User.controller.js');
const { login, checkDuplicateUsername } = require('../controllers/Auth.controller.js');
const router = express.Router();


// Route to add new user
router.post('/addUser', addUser);

// Route for user login
router.post('/login', login);

// Route to check duplicate username for registering
router.get('/checkDuplicateUsername/:username', checkDuplicateUsername)

// Export the router
module.exports = router;