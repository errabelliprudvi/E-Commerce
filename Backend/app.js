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
const isAuthenticated = require('./middlewares/auth')
const demoRoute = require('./routes/demoRoute')
const cors = require('cors');

const session = require('./middlewares/Session')
// Load environment variables
const connectDB = require('./db/connect');
require('dotenv').config();

// Serve static files from the "public" directory
//app.use(express.static('public'));

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'public')));

// Add CORS middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, etc.)
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
);


app.use(express.json({ limit: '10mb' })); // Increase JSON payload limit to 10MB
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // For URL-encoded payloads

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log(`Headers:`, req.headers);
  next();
});


app.use(session)

app.use('/api/users',userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin',demoRoute)
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/user',authRoutes)
app.use('/api/upload',uploadRoutes)



// Catch-all route for React to handle routing (important for single-page apps)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



//const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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