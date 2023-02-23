const router = require('express').Router();
// const app = express();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const ordersController = require("../Controller/OrsersController/ordersController");

router.post('/create-checkout-session', ordersController.createOrder, async (req, res) => {

    const Body = JSON.stringify(req.body);
    console.log("BODY:  " + Body)

    const line_items = req.body.products.map(item => {
        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.title,
                    images: [item.image]
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }
    });

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: 'https://www.google.com',
        cancel_url: 'https://www.facebook.com',
    });
    console.log(session.url);
    res.send({ url: session.url })
}, ordersController.confirmOrder);

module.exports = router;
