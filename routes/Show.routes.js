const express = require('express');
const {addNew, getAll, getById, updateById, deleteById} = require('../controllers/Operations.controller.js');
const router = express.Router();

// Route to add a new show
router.post('/addNew', addNew);

// Route to get all shows
router.get('/getAll', getAll);

// Route to get a show by ID
router.get('/getById/:id', getById);

// Route to update a show by ID
router.put('/updateById', updateById);

// Route to delete a show by ID
router.delete('/deleteById/:id', deleteById);

// Export the router
module.exports = router;