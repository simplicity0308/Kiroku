const showModel = require('../models/Show.js')

const changeEpisode = async (req, res) => {
    let {showId, count} = req.body;
    console.log("show id and count back prior validation:", showId, count);
    if(validateShowId(showId)) {
        try {
            console.log("show id and count back:", showId, count);
            const updatedShow = await showModel.findOneAndUpdate(
                { id: showId }, 
                { $inc: { episode: count } }, 
                { new: true , 
                  runValidators: true 
                }
            );

            if(updatedShow) {
                console.log(`Show with ID ${showId} updated successfully`);
                return res.status(200).json(updatedShow);
            } else {
                return res.status(404).json({ error: 'Update failed' });
            }

        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve show' });
            
        }
    } else {
        return res.status(400).json({ error: 'Show not found' });
    }
}

// helper funciton 
// validate showid
const validateShowId = async (showId) => {
    const findResult = await showModel.findOne({ id: showId });
    if (!findResult) {
        return false;
    } else {
        return true;
    }
}

// validate showcount

module.exports = {
    changeEpisode
}