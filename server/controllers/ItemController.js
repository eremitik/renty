// import asyncHandler from 'express-async-handler'

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

const updateItem = async (req, res) => {
    const { id } = req.params;
    const { title, description, tags, creator } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No item with id: ${id}`);

    const updatedItem = { title, description, tags, creator, _id: id };

    await PostItem.findByIdAndUpdate(id, updatedItem, { new: true });

    res.json(updatedItem);
}

const deleteItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Item with id: ${id}`);

    await PostItem.findByIdAndRemove(id);

    res.json({ message: "Item deleted successfully." });
}

const getItemsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query

    try {
        const item = new RegExp(searchQuery, 'i');
        const items = await PostItem.find({ item });
        res.json({ data: items });
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}


export {
    getItems,
    createItem,
    updateItem,
    deleteItem,
    getItemsBySearch,

}