const ToDo = require('../models/todo')
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../middlewares/async')


const addTodo = async (req, res) => {
    const { text,completed } = req.body;
    const todo = { text,completed }
    try {
        // Create a new user
        const newTodo = new ToDo(todo);
        await newTodo.save(); // Save the user to the database
        res.status(201).send('Todo added successfully!');
    } catch (error) {
        // Handle errors (e.g., username already exists)
        res.status(400).send(error.message);
    }
}

//Here we are using centralised middleware for error handling
const updateTodo = asyncWrapper(async (req,res)=>{
    
    const   todo = await ToDo.findOneAndUpdate(
      { id: req.body.id },    // Find user by name
      req.body,                     // Update data
      { new: true, runValidators: true } // Options
    );
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
 
    res.status(400).json({ error: error.message });
  
})
const deleteTodo = asyncWrapper( async (req,res)=>{

    const todo = await ToDo.findOneAndDelete(req.body.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully' });
  
    res.status(500).json({ error: error.message });
})

const allTodos = asyncWrapper(async (req,res) =>{
    
    const todos = await ToDo.find();
    if (!todos) return res.status(404).json({ error: 'todos not found' });
    res.json(todos);

    res.status(500).json({ error: error.message });
  
})

module.exports = {
    allTodos,
    addTodo,
    updateTodo,
    deleteTodo,
}