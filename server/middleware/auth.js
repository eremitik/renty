import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
// import config from '../config';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export default (req, res, next) => {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token)
        return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        // Add user from payload
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};