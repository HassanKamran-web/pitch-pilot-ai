const express = require('express');
const app = express()
const { stripeWebhook } = require('../controllers/payment.controller');
const router = express.Router();

router.post("/stripe-webhook",express.raw({type:'application/json'}),stripeWebhook)

app.use(express.json())

module.exports = router