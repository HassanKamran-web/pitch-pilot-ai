const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    credits: { type: Number, default: 100 },
    plan: { type: String, default: 'free' },
    stripeCustomerId: { type: String },
    createdAt: { type: Date, default: Date.now }
});   

const User = mongoose.model('User', userSchema);

module.exports = User;  