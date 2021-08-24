import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getStripe = async (req, res) => {
    const products = await stripe.products.list();
    res.send(products);
};


const YOUR_DOMAIN = 'http://localhost:3000';

// app.post("/api/prices/:priceID/oneTimePayment", async (req, res) => {
const postStripe = async (req, res) => {
  // const { id } = req.params;
  // try{
    
    console.log(req.params.id)
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // price: 'price_1JRseIIZNIF6strfEJeDLx8P',
        price: req.params.id,
        // price: id,
        quantity: 1,
      },
    ],
    payment_method_types: [
      'card',
    ],
    mode: 'payment',
    // success_url: `${YOUR_DOMAIN}/success.html`,
    success_url: `${YOUR_DOMAIN}/#/main`,
    cancel_url: `${YOUR_DOMAIN}/#/main`,
  });
  // res.redirect(303, session.url)
  res.json({url: session.url}) 

  // }catch (err) {
    // console.log(err)
  // }
  
  
};

export {
    getStripe,
    postStripe,
}