import { Router } from 'express';
// import mongoose from 'mongoose';
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getItemsBySearch
} from "../controllers/ItemController.js"

const router = Router();

router.get('/', getItems)
router.post('/', createItem)
router.patch('/:id', updateItem)
router.delete('/:id', deleteItem)
router.get('/:id', getItemsBySearch)


export default router;