import session from 'express-session';

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET ,// Use a secure, random secret in production
  resave: false, // Prevents session being saved back to the store if not modified
  saveUninitialized: true, // Do not save uninitialized sessions
  cookie: {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true ,//process.env.NODE_ENV === 'production', // True in production for HTTPS
    maxAge: 1000 * 60 * 60, // 1 hour in milliseconds
  },
});

export default sessionMiddleware;
