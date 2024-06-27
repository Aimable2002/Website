import jwt from 'jsonwebtoken';


const verifyJwtToken = (req, res, next) => {
    const token = req.query.token; // Get token from query parameters

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, process.env.WEBHOOK_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
};