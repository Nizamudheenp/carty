const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require("./config/db")

const authRoutes = require("./routes/AuthRoute")
const productRoutes = require("./routes/ProductsRoute")
const orderRoutes = require("./routes/OrderRoute")
const app = express();
connectDB()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
  }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
