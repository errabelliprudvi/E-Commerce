const jwt = require('jsonwebtoken');
function requireAuthentication(req, res, next) {
    // Check if the Authorization header is present
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send('Unauthorized: No token provided');
    }
     console.log(authHeader)
    // Split the header into 'Bearer' and token parts
    const token = authHeader.split(' ')[1]||authHeader;
    console.log(token)
    if (!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Forbidden: Invalid token');
        }
        // Token is valid, attach user info to request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
}


module.exports =  requireAuthentication