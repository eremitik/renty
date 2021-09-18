import Stripe from 'stripe';
import dotenv from "dotenv";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
dotenv.config();

const getStripe = async (req, res) => {
  const products = await stripe.products.list();
  res.send(products);
};

let YOUR_DOMAIN;
(process.env.ENVIRONMENT === "PROD") ? (YOUR_DOMAIN = 'http://rentyhq.com') : (YOUR_DOMAIN = 'http://localhost:3000') 

const postStripe = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: req.params.id,
        quantity: req.params.qty,
      },
    ],
    payment_method_types: [
      'card',
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/#/profile`,
    cancel_url: `${YOUR_DOMAIN}/#/main`,
  });
  res.json({ url: session.url })
};

export {
  getStripe,
  postStripe,
}