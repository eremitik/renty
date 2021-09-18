import PostItem from '../models/postItem.js';
import PostOrder from '../models/orders.js';
import Stripe from 'stripe';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);
const stripe = new Stripe('sk_test_51JKIuDIZNIF6strf1jaT9lK5m0jtirHlhgdQJ0TLqvAEuqtlRZDIxd83cvXPRchs7WmZMhurhtsXZFBDMHbL5r97004DqN6MGg');
dotenv.config();

const getItems = async (req, res) => {
  try {
    const postItems = await PostItem.find();
    res.status(200).json(postItems);
  } catch (err) {
    res.status(404).json({ message: err.body })
  }
}

const createItem = async (req, res) => {
  try {
    const {
      title,
      description,
      email,
      name,
      tags,
      price,
      selectedFile
    } = req.body;
    const product = await stripe.products.create({
      name: title,
      description: description
    });
    const newPrice = await stripe.prices.create({
      unit_amount: price,
      currency: "jpy",
      product: product.id,
    });
    const newItem = {
      title,
      description,
      email,
      name,
      tags,
      rented: false,
      price_id: newPrice.id,
      price,
      selectedFile
    };
    const postMongo = new PostItem(newItem);
    await postMongo.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(409).json({ message: err.message })
  }
}

// Removed additional params from req body only to update "rented" field
const updateItem = async (req, res) => {
  const { id } = req.params;
  const { rented } = req.body;
  const updatedItem = { _id: id, rented };

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No item with id: ${id}`);
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
  const { searchQuery, } = req.query

  try {
    const item = new RegExp(searchQuery, 'i');
    const items = await PostItem.find({ $or: [{ tags: item }, { title: item }, { description: item }] });
    res.json({ data: items });
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

const createOrder = async (req, res) => {
  const { returnDate, startDate } = req.body
  let calcNights = parseInt((new Date(returnDate) - new Date(startDate)) / (1000 * 60 * 60 * 24), 10)

  try {
    const {
      title,
      price_id,
      nightPrice,
      lenderEmail,
      lenderName,
      renterEmail,
      renterName,
      paid,
    } = req.body;
    const newOrder = {
      title,
      price_id,
      nightPrice: parseInt(nightPrice),
      lenderEmail,
      lenderName,
      numberNights: calcNights,
      startDate,
      returnDate,
      renterEmail,
      renterName,
      paid,
      totalPrice: calcNights * nightPrice,
    };
    const postMongo = new PostOrder(newOrder);
    await postMongo.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(409).json({ message: err.message })
  }
}

export {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getItemsBySearch,
  createOrder,
}