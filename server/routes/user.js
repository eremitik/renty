import { Router } from 'express';
// User Model
// import User from '../models/users.js';

import {
    authUser,
    registerUser,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} from '../controllers/userController.js'
import auth from "../middleware/auth.js"

const router = Router();

router.route('/').post(registerUser).get(auth, getUsers)
// router.post('/register', registerUser)
router.post('/login', authUser)

router
    .route('/:id')
    .delete(auth, deleteUser)
    .get(auth, getUserById)
    .put(auth, updateUser)


export default router;