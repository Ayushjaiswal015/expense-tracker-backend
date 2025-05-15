require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: 'https://singular-quokka-e4ecbc.netlify.app/' 
}));
app.use(express.json());

// Root route (to fix "Cannot GET /" message)
app.get('/', (req, res) => {
  res.send('API is working 🚀');
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    // useNewUrlParser & useUnifiedTopology are deprecated in Mongoose v6+
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Routes
const expenseRoutes = require('./routes/expenses');
app.use('/api/expenses', expenseRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
