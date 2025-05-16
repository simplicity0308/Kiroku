const showModel = require('../models/Show.js');

// POST /addNew
const addNew = async (req, res) => {
    // Parse the request body
    let { title, status, episode, season, notes  } = req.body;

    // Validation
    const validation = validate(title);

    if (validation.error) {
        return res.status(400).json({ error: validation.error });
    } else if (validation.success) {

        // If validation is successful, proceed to add to db
        console.log(`Validation successful for ${title}`);
        try {
            // Get current newest ID
            let lastShow = await showModel.findOne().sort({ id: -1 });
            let newShowID = lastShow ? lastShow.id + 1 : 1;  // If no shows exist yet, start with ID 1
            console.log(`New show ID: ${newShowID}`);

            const newShow = new showModel({title, id : newShowID, status, episode, season, notes });
            console.log(`New show created: ${newShow}`);
            
            const savedShow = await newShow.save(); // Save to DB
            console.log(`Show ${savedShow.title} added successfully`);
            // add db
            return res.status(201).json({ message: 'Show added successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to add to DB' });
        }
    }
}

// GET /getAll
const getAll = async (req, res) => {
    // Get all shows from the database
    try {
        const shows = await showModel.find(); // Find all shows
        console.log(`Retrieved ${shows.length} shows from the database`);
        return res.status(200).json(shows);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve shows' });
    }
}

// GET /getById/:id
// maybe filter by name?
const getById = async (req, res) => {
    // Get show by ID from the database
    try {
        const show = await showModel.findOne({ id: req.params.id});
        if (!show) {
            return res.status(404).json({ error: 'Show not found' });
        } else { 
            console.log(`Show with ID ${req.params.id} retrieved successfully`);
            return res.status(200).json(show);
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve show' });
    }
}

// PUT /updateById
const updateById = async (req, res) => {
    // Parse the request body
    let {title, id, status, episode, season,notes} = req.body;

    // Validation
    const idValidation = validateId(id);
    if (idValidation.error) {
        return res.status(400).json({ error: idValidation.error });
    } else {
        try{
            const updatedShow = await showModel.findOneAndUpdate(
                { id: id }, // Find show by ID
                { title, status, episode, notes, season }, // Update fields
                { new: true , // Return the updated document
                  runValidators: true  // Validate the update
                }
            );

            if (!updatedShow) {
                return res.status(404).json({ error: 'Show not found' });
            } else {
                console.log(`Show with ID ${id} updated successfully`);
                return res.status(200).json(updatedShow);
            }
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update show' });
        }
    }   
}

// DELETE /deleteById/:id
const deleteById = async (req, res) => {
    let id = req.params.id;

    let idValidation = validateId(id);

    if (idValidation.error) {
        return res.status(400).json({ error: idValidation.error });
    } else {
        try {
            const deletedShow = await showModel.findOneAndDelete({ id: id });
            if (!deletedShow) {
                return res.status(404).json({ error: 'Show not found' });
            } else {
                console.log(`Show with ID ${id} deleted successfully`);
                return res.status(200).json({ message: 'Show deleted successfully' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete show' });
        }
    }
}

// Helper functions 

// Validation function
const validate = (title) => {
    // Check if title is empty
    if (!title) {
        return { error: 'Title is required' };
    } else {
        return { success: true };
    }
};

const validateId = (id) => {
    // Check if ID is a number
    if (isNaN(id)) {
        return { error: 'ID must be a number' };
    } else if (id < 0) {
        return { error: 'ID must be greater than 0' };
    } else{
        return { success: true };
    }
};




// Export
module.exports = {
    addNew,
    getAll,
    getById,
    updateById,
    deleteById,
};