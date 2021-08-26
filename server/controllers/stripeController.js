import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getStripe = async (req, res) => {
    const products = await stripe.products.list();
    res.send(products);
};


const YOUR_DOMAIN = 'http://localhost:3000';

const postStripe = async (req, res) => {

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: req.params.id,
        quantity: 1,
      },
    ],
    payment_method_types: [
      'card',
    ],
    mode: 'payment',
    // success_url: `${YOUR_DOMAIN}/#/main`,
    success_url: `${YOUR_DOMAIN}/#/orders/${req.params.id}`,
    cancel_url: `${YOUR_DOMAIN}/#/main`,
  });
  // do something
  res.json({url: session.url}) 
};

export {
    getStripe,
    postStripe,
}