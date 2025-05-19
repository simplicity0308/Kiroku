const showModel = require('../models/Show.js')
const userModel = require('../models/User.js')

// DELETE admin/deleteAll  BACKEND ONLY
const deleteAll = async (req, res) => {
    try {
        const result = await showModel.deleteMany({}); 
        console.log(`Deleted ${result.deletedCount} shows from the database`);
        return res.status(200).json({ message: 'All shows deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete shows' });
    }
}   

const deleteAllUsers = async (req, res) => {
    try {
        const result = await userModel.deleteMany({}); 
        console.log(`Deleted ${result.deletedCount} users from the database`);
        return res.status(200).json({ message: 'All users deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete users' });
    }
}

module.exports = {
    deleteAll,
    deleteAllUsers
}