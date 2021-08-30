import { Router } from 'express';

import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getItemsBySearch,
  createOrder
} from "../controllers/itemController.js"
import auth from "../middleware/auth.js"

const router = Router();

router.get('/', auth, getItems)
router.post('/', createItem)
router.patch('/:id', updateItem)
router.delete('/:id', deleteItem)
router.get('/search', getItemsBySearch)
router.post('/order', createOrder)


export default router;