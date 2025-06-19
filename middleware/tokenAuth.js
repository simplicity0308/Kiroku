// verify jwt token
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Add user info from payload to request
            req.user = decoded;
            
            // Continue to the next middleware/route handler
            next();
        } catch (error) {
            // Token verification failed
            console.error('Token verification failed:', error.message);
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
    } else {  
    // No token provided
        return res.status(403).json({
            success: false,
            message: 'Access denied. No token provided.'
        });
    }
}

module.exports = {
    checkToken
};