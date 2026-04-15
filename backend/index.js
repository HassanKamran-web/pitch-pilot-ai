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

app.use(cors());
app.use('/api/webhook', webhookRoutes);
app.use(express.json());

app.use('/api/auth/user', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/leads', leadRoutes)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});