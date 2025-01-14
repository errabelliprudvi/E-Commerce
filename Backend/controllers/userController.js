const User = require('../models/userSchema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // For generating JWT tokens
//const { validationResult } = require('express-validator'); // For validating inputs (optional)


// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, phone, addresses, isAdmin } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const user = new User({
      name,
      email,
      password,
      phone,
      addresses,
      isAdmin,
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Get all users (Admin only)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Update user information
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password, phone, addresses, isAdmin } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (phone) user.phone = phone;
    if (addresses) user.addresses = addresses;
    if (isAdmin !== undefined) user.isAdmin = isAdmin;

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete a user (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// Add an address to a user
exports.addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { street, city, state, zip, country } = req.body;

    if (!street || !city || !state || !zip || !country) {
      return res.status(400).json({ message: 'All address fields are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.addresses.push({ street, city, state, zip, country });
    await user.save();

    res.status(200).json({ message: 'Address added successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error adding address', error });
  }
};

// Update an address of a user
exports.updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const { street, city, state, zip, country } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Update address fields
    if (street) address.street = street;
    if (city) address.city = city;
    if (state) address.state = state;
    if (zip) address.zip = zip;
    if (country) address.country = country;

    await user.save();
    res.status(200).json({ message: 'Address updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating address', error });
  }
};

// Delete an address from a user
exports.deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    address.remove();
    await user.save();

    res.status(200).json({ message: 'Address deleted successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting address', error });
  }
};

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
//SignUp 
exports.signup = async (req, res) => {
  const { name, email, password, phone} = req.body;
  const addresses= [
    {
      "street": " ",
      "city": " ",
      "state": " ",
      "zip": " ",
      "country": " "
    }]

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists. Please login." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      addresses,
    });

    // Save the user
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      //return res.status(400).json({ error: "Invalid email or password" });
      return res.status(401).json({ message: "Invalid EmailId." });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
     // return res.status(400).json({ error: "Invalid email or password" });
      return res.status(401).json({ message: "Invalid Password " });
    }

   
    req.session.userId = user._id;
    req.session.username =user.name;
    req.session.email = user.email;
    req.session.isAdmin = user.isAdmin;

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        addresses: user.addresses,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
