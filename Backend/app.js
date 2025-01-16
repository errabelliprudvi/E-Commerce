const express = require('express');
const app = express();
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
const ratingRoutes = require('./routes/ratingRoutes');
const authRoutes = require('./routes/authRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const paymentRoutes = require('./routes/paymentRoutes');
const isAuthenticated = require('./middlewares/auth')
const demoRoute = require('./routes/demoRoute')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const sessionMiddleware = require('./middlewares/Session')

const connectDB = require('./db/connect');


app.use(express.static(path.join(__dirname, 'public')));


app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? '*' : 'http:192.168.29.52', // Allow all origins in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies to be sent with cross-origin requests
}));
app.use(sessionMiddleware);
app.use(express.json({ limit: '10mb' })); // Increase JSON payload limit to 10MB
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // For URL-encoded payloads

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log(`Headers:`, req.headers);
  next();
});


app.use('/api/users',isAuthenticated,userRoutes);
app.use('/api/products',  productRoutes);
app.use('/api/admin',isAuthenticated,demoRoute);
app.use('/api/orders', isAuthenticated,orderRoutes);
app.use('/api/cart',isAuthenticated,cartRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/upload', isAuthenticated ,uploadRoutes);
app.use('/api/payment', isAuthenticated,paymentRoutes);
app.use('/user',authRoutes);


app.get('*', (req, res) => {
 //res.sendFile(path.join(__dirname, 'public', 'index.html'));
 res.status(500).json({ error: "No file found" });
});


const port = process.env.PORT || 3000;
// Start the server
const start = async () => {
    try {
        console.log(process.env.MONGO_URI)
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();