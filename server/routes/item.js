import { Router } from 'express';

import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getItemsBySearch,
  createOrder
} from "../controllers/itemController.js"

const router = Router();

router.get('/', getItems)
router.post('/', createItem)
router.patch('/:id', updateItem)
router.delete('/:id', deleteItem)
router.get('/:id', getItemsBySearch)
router.post('/order', createOrder)


export default router;