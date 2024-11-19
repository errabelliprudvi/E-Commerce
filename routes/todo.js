const express = require('express')
const router = express.Router()

const{
    allTodos,
    addTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/todoList')

//router.route('/login').post(getUserDetails)

router.route('/add').post(addTodo)
router.route('/delete').delete(deleteTodo)
router.route('/all').get(allTodos)
router.route('/update').put(updateTodo)

module.exports = router