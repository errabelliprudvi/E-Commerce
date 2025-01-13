const session = require('express-session');

const sessionMiddleware = session({
  secret: 'your-secret-key', // Use a secure, random secret in production
  resave: false, // Prevents session being saved back to the store if not modified
  saveUninitialized: false, // Do not save uninitialized sessions
  cookie: {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: false ,//process.env.NODE_ENV === 'production', // True in production for HTTPS
    maxAge: 1000 * 60 * 60, // 1 hour in milliseconds
  },
});

module.exports = sessionMiddleware;
