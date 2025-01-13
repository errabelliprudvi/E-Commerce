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
const isAuthenticated = require('./middlewares/auth')
const cors = require('cors');

const session = require('./middlewares/Session')
// Load environment variables
const connectDB = require('./db/connect');
require('dotenv').config();


app.use(express.json());

// Serve static files from the "public" directory
//app.use(express.static('public'));

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'public')));

/*app.use(cors({
  origin: 'http://localhost:5173' // Replace with your React app's URL
}));*/


app.use(session)

app.use('/api/users',userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/user',authRoutes)



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