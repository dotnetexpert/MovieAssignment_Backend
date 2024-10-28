// src/middleware/auth.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export const authorize = (req) => {
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
        throw new Error('No authorization header provided');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new Error('No token provided');
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded; // Return the decoded token information
    } catch (error) {
        throw new Error('Invalid token');
    }
};
