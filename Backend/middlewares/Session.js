const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,  // Secure random secret
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/E_Commerce', // MongoDB connection URI
    collectionName: 'sessions', // Name of the sessions collection
    ttl: 14 * 24 * 60 * 60, // Session TTL (Time to live) in seconds (14 days)
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Secure cookies in production (requires HTTPS)
    maxAge: 1000 * 60 * 60, // Session expiration (1 hour)
  },
});

module.exports = sessionMiddleware;
