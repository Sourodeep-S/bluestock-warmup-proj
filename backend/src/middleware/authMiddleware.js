import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // 1. Get token from the header
    const authHeader = req.header('Authorization');

    // 2. Check if token exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }

    try {
        // 3. Verify the token
        const token = authHeader.split(' ')[1]; // Get token from "Bearer <token>"
        const decoded = jwt.verify(token, 'placeholdersecrettokenhere'); // Use the same secret as in login

        // 4. Add user from payload to the request object
        req.user = decoded.user;

        // 5. Call next() to pass control to the next function
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};

export default authMiddleware;