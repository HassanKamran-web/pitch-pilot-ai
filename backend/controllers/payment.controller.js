const Stripe = require('stripe')
const userModel = require('../models/user.model')


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const createCheckoutSession = async (req, res) => {
    const { plan } = req.body;


    let price = 0
    let planName = ""
    let credits = 0

    if (plan === "Pro") {
        price = 1000
        planName = "Pro Plan"
        credits = 500
    }

    if (plan === "Premium") {
        price = 2000
        planName = "Premium Plan"
        credits = 1000
    }
    const session = await stripe.checkout.sessions.create({

        payment_method_types: ["card"],

        line_items: [{
            price_data: {
                currency: "usd",
                product_data: {
                    name: planName
                },
                unit_amount: price
            },
            quantity: 1
        }],

        mode: "payment",
        metadata: {
            userId: req.user.userId,
            plan: plan
        },
        success_url: `${process.env.FRONTEND_URL}/dashboard/profile?success=true`,
        cancel_url: `${process.env.FRONTEND_URL}/dashboard/pricing`

    })

    return res.status(200).json({ url: session.url })
}

const stripeWebhook = async (req, res) => {
    let event;
    try {
        const sig = req.headers["stripe-signature"];

        // req.body ab raw Buffer hai
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

    } catch (err) {
        console.error("Webhook signature verification failed.", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const userId = session.metadata.userId;
        const plan = session.metadata.plan;
        let credits = 0;
        if (plan === "Pro") credits = 500;
        if (plan === "Premium") credits = 1000;

        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.credits += credits;
        user.plan = plan;
        await user.save();

    }


    res.json({ received: true });




}
module.exports = { createCheckoutSession, stripeWebhook }