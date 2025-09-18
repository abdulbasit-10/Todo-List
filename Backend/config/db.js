// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  const DB_URL = process.env.DB_URL;
  if (!DB_URL) {
    throw new Error('DB_URL is not defined in environment variables');
  }

  try {
    await mongoose.connect(DB_URL);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error; // rethrow so caller can handle exit if desired
  }
};

module.exports = connectDB;
