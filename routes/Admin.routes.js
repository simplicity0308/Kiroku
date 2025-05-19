const express = require('express');
const { deleteAll, deleteAllUsers } = require('../controllers/Admin.controller.js');
const router = express.Router();

// Route to delete all shows
router.delete('/deleteAll', deleteAll); // DELETE admin/deleteAll

// Route to delete all users
router.delete('/deleteAllUsers', deleteAllUsers); // DELETE admin/deleteAllUsers

// Export the router
module.exports = router;