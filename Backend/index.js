// index.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const UserRoutes = require('./routes/user_routes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// middleware to parse JSON body
app.use(express.json());

app.use(cors())
// API routes
app.use('/api/v0/todo', UserRoutes);

// connect DB first, then start server
const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server because DB connection failed.', err);
    process.exit(1);
  }
};

start();
