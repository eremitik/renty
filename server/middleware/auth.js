import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler' //Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
import dotenv from "dotenv";
// import config from '../config';
import User from '../models/users.js';
dotenv.config();

// const JWT_SECRET = "dsfgrdsfgrsdfgsdgrdsfgf"  //process.env.JWT_SECRET;

const auth = asyncHandler(async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})
export default auth