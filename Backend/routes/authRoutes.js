const express = require('express');
const {
  login,
  signup
} = require('../controllers/userController');
const isAuthenticated = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', signup);

router.post('/login',login)

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to logout' });
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.status(200).json({ message: 'Logout successful' });
  });
});


router.get('/session', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user); // Return session user data
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});



module.exports = router;