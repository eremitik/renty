import PostOrder from '../models/orders.js';
import dotenv from 'dotenv';
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
        renterEmail,
        renterName,
        paid,
        selectedFile,
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
        selectedFile,
      };
        const postMongo = new PostOrder(newOrder);
        await postMongo.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}


export {
    getOrders,
    createOrder
}