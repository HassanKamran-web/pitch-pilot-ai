const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createCheckoutSession } = require('../controllers/payment.controller')
const router = express.Router()

router.post("/checkout",authMiddleware,createCheckoutSession)

module.exports = router