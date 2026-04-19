const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/db')
connectDB();
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const leadRoutes = require('./routes/lead.route');
const paymentRoutes = require('./routes/payment.route')
const webhookRoutes = require('./routes/webhook.route')
const compression = require('compression');

app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST"],
  credentials: true,
  
}));
app.use('/api/webhook', webhookRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth/user', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/leads', leadRoutes)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT);
module.exports = app;