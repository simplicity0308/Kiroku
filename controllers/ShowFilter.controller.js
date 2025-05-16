const showModel = require('../models/Show.js');

// GET /filter
const filter = async (req, res) => {
    // parse request param for filter type 
    const { filterType } = req.query;
    console.log("filter type:", filterType);
    try {
        const shows = await showModel.find({
            status: filterType
        })
        console.log(`Retrieved ${shows.length} with status ${filterType}`)
        return res.status(200).json(shows);
    } catch (error) {
        console.error('Error retrieving shows:', error);
        return res.status(500).json({ error: 'Failed to retrieve shows' });
    }

}

module.exports = {
    filter
}
