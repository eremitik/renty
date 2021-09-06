import { Router } from 'express';

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

router.route('/').get(auth, getUsers)
router.post('/register', registerUser)
router.post('/login', authUser)

router
    .route('/:id')
    .delete(auth, deleteUser)
    .get(auth, getUserById)
    .put(auth, updateUser)


export default router;