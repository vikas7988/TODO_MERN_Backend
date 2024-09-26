import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config.js';
import User from "../database/model/userModel.js";

export default async (req, res, next) => {
    
    const token = req.cookies.token
    // console.log(token)
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const verified = jwt.verify(token, jwtSecret);
        req.user = await User.findById(verified.id); 
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};
