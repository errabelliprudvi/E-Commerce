
const mongoose = require('mongoose');

const TodoListSchema = new mongoose.Schema({
    text:{type: String, required: true},
    completed:{type: Boolean, required: true}
});



 module.exports = mongoose.model('ToDo', TodoListSchema);