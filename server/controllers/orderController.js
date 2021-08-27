import PostOrder from '../models/orders.js';
// import Stripe from 'stripe';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const stripe = new Stripe('sk_test_51JKIuDIZNIF6strf1jaT9lK5m0jtirHlhgdQJ0TLqvAEuqtlRZDIxd83cvXPRchs7WmZMhurhtsXZFBDMHbL5r97004DqN6MGg');
dotenv.config();

const getOrders = async (req, res) => {
    try {
        const postOrders = await PostOrder.find();
        res.status(200).json(postOrders);
    } catch (err) {
        res.status(404).json({ message: err.body })
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
        totalPrice,
        lenderEmail,
        lenderName,
        numberNights,
        // startDate,
        // returnDate,
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

// const updateOrder = async (req, res) => {
//   const { id } = req.params;
//   const { title, description, tags, email } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No item with id: ${id}`);

//   const updatedItem = { title, description, tags, email, _id: id };

//   await PostItem.findByIdAndUpdate(id, updatedOrder, { new: true });

//   res.json(updatedOrder);
// }


export {
    getOrders,
    createOrder
}