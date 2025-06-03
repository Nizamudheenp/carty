const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require("./config/db")

const authRoutes = require("./routes/AuthRoute")
const productRoutes = require("./routes/ProductsRoute")
const orderRoutes = require("./routes/OrderRoute")
const app = express();
connectDB()

const allowedOrigins = process.env.FRONTEND_URL.split(',').map(origin => origin.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
