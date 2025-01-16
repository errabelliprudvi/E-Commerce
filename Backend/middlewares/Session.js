const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,  // Secure random secret
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI , // MongoDB connection URI
    collectionName: 'sessions', // Name of the sessions collection
    ttl: 14 * 24 * 60 * 60, // Session TTL (Time to live) in seconds (14 days)
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'prod', // Secure cookies in production (requires HTTPS)
    sameSite:'None',
    maxAge: 1000 * 60 * 60, // Session expiration (1 hour)
  },
});

module.exports = sessionMiddleware;
