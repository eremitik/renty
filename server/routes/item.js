import express from 'express';
// import mongoose from 'mongoose';
import PostItem from '../models/postItem.js';

const getItems = async (req, res) => {
  try {
    const postItems = await PostItem.find();
    res.status(200).json(postItems);
  } catch (err) {
    res.status(404).json({ message: err.body })
  }
}

const createItem = async (req, res) => {
  const item = req.body;
  const newItem = new PostItem(item);

  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(409).json({ message: err.message })
  }
}

// routing section
const router = express.Router();

// endpoints
router.get('/', getItems);
router.post('/', createItem);

export default router;