const express = require('express');
const { deleteAll } = require('../controllers/Admin.controller.js');
const router = express.Router();

// Route to delete all shows
router.delete('/deleteAll', deleteAll); // DELETE admin/deleteAll

// Export the router
module.exports = router;