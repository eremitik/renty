import { Router } from 'express';
// import auth from "../middleware/auth.js"

import {
  getOrders,
  createOrder
} from "../controllers/orderController.js"

const router = Router();

router.get('/', getOrders)
router.post('/', createOrder)


export default router;