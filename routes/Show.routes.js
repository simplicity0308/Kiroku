const express = require('express');
const {addNew, getAll, getById, updateById, deleteById} = require('../controllers/ShowOperations.controller.js');
const { changeEpisode } = require('../controllers/ShowAttributes.controller.js');
const { filter } = require('../controllers/ShowFilter.controller.js');
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

// Route to increment the episode count
router.put('/changeEpisode', changeEpisode); 

// Route to filter shows by status
router.get('/filter', filter);

// Export the router
module.exports = router;