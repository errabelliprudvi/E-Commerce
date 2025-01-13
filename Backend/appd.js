// server.js
const express = require('express');
const cors = require('cors');

const requireAuthentication = require('./middlewares/authentication')
const errhandler = require('./middlewares/errorHandler')
const user = require('./routes/users')
const token = require('./routes/token')
const todo = require('./routes/todo')
// Load environment variables
const connectDB = require('./db/connect');
require('dotenv').config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json()); 

// Serve static files from the "public" directory
app.use(express.static('public'));

app.use(cors({
  origin: 'http://localhost:5173' // Replace with your React app's URL
}));

// Middleware to require authentication
//app.use(requireAuthentication)

app.all( '/api/*',requireAuthentication)
app.use('/api/v1/user',user)

app.use('/token',token)
app.use('/todo',todo)

//app.use(errhandler);


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