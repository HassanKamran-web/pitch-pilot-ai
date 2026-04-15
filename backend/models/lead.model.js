const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  companyName: { type: String, required: true },
  website: { type: String, required: true },
  industry: { type: String },
  contactName: { type: String },
  status: { type: String, default: "pending" },
  email: { type: String },
  subject: { type: String },
  emailBody: { type: String },
  score: Number,
  quality: String,
  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: 86400 
  }
});

module.exports = mongoose.model("Lead", leadSchema);