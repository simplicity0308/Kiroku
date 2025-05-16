const showModel = require('../models/Show.js')

const changeEpisode = async (req, res) => {
    let {showId, count} = req.body;
    console.log("show id and count back prior validation:", showId, count);
    const showOriginal = await showModel.findOne({ id: showId });


    if(validateShowId(showId)) {
        if(validateCount(count, showOriginal)) {
            console.log("show id and count back:", showId, count);
            try {
                const updatedShow = await showModel.findOneAndUpdate(
                { id: showId }, 
                { $inc: { episode: count } }, 
                { new: true , 
                  runValidators: true 
                });

                if(updatedShow) {
                    console.log(`Show with ID ${showId} updated successfully`);
                    return res.status(200).json(updatedShow);
                } else {
                    return res.status(404).json({ error: 'Update failed' });
                }
            } catch (error) {
                console.error('Error updating show:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
        } else  {
            console.log("episode count is negative");
            return res.status(400).json({ error: 'Episode count cannot be negative' });
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

const validateCount = (count, show) => {
    const newEpisode = show.episode + count;
    console.log("new episode count:", newEpisode);
    if (newEpisode < 0) {
        return false;
    } else {
        return true;
    }

}
module.exports = {
    changeEpisode
}