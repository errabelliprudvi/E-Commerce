const jwt = require('jsonwebtoken');
const User = require('../models/user')
const asyncWrapper = require('../middlewares/async')


//We need to implement try_catch to handle errors
const userRegistration =async (req, res) => {
    const { username, password ,email } = req.body;
    const user = {username,password,email}
    try {
        // Create a new user
        const newUser = new User(user);
        await newUser.save(); // Save the user to the database
        res.status(201).send('User registered successfully!');
    } catch (error) {
        // Handle errors (e.g., username already exists)
        res.status(400).send(error.message);
    }
}

//Here we are using centralised middleware for error handling
const updateUser = asyncWrapper(async (req,res)=>{
    
        const user = await User.findOneAndUpdate(
          { username: req.user.username },    // Find user by name
          req.body,                     // Update data
          { new: true, runValidators: true } // Options
        );
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
     
        res.status(400).json({ error: error.message });
      
})
const deleteUser = asyncWrapper( async (req,res)=>{
   
        const user = await User.findOneAndDelete(req.user.username);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
      
        res.status(500).json({ error: error.message });
})

const allUsers = asyncWrapper(async (req,res) =>{
    
        const users = await User.find();
        if (!users) return res.status(404).json({ error: 'User not found' });
        res.json(users);
    
        res.status(500).json({ error: error.message });
      
})

const getProfile = asyncWrapper (async (req, res) => {
    //res.send(`Hello, ${req.user.username}!`);

    
        const user = await User.findOne({ username: req.user.username });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
  
        res.status(500).json({ error: error.message });
}
)

const token = asyncWrapper(async(req,res)=>{
        const {username,password,email} =req.body
        const user = {username,password,email}

        // try{
        
            // Create a new user
            const newUser = new User(user);
            await newUser.save(); // Save the user to the database
            //res.status(201).send('User registered successfully!');
            // Create a token
            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        // }catch(error){
            // Handle errors (e.g., username already exists)
            res.status(400).send(error.message);
         }
     // }
    )

        // Create a token
       // const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
        //res.json({ token });

      

module.exports = {
    allUsers,
    userRegistration,
    deleteUser,
    updateUser,
    getProfile,
    token,
}