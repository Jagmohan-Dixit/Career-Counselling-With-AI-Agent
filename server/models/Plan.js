const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Prevent duplicate plan names
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  durationInMonths: {
    type: Number,
    required: true,
    min: 1
  },
  features: {
    type: [String], // List of features included in the plan
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
    timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);
