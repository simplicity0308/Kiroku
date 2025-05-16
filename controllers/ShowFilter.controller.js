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


// GET /search
const search = async (req, res) => {
    const { searchTerm } = req.query;
    console.log("search term:", searchTerm);
    try {
        const results = await showModel.aggregate([
            {
                $search: {
                    index: 'title', 
                    text: {
                        query: `${searchTerm}`,
                        path: "title",
                        fuzzy: {
                          maxEdits: 2, 
                        }
                    }
                }
        }
        ]);   
        if (results.length === 0) {
            return res.status(404).json({ message: 'No shows found' });
        } else {
            console.log(`Found ${results.length} shows matching "${searchTerm}"`);
            return res.status(200).json(results);
        }
    } catch (error) {
        console.error('Error searching shows:', error);
        return res.status(500).json({ error: 'Failed to search shows' });
    }
}
    

module.exports = {
    filter,
    search
}
