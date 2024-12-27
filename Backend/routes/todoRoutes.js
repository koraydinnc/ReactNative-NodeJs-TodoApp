const express = require('express')
const {addTodo, getTodos, deleteTodo, completedTodo, getDateTodos} = require('../controllers/todoController')

const router = express.Router();

router.post('/add-todo', addTodo);
router.get('/get-todo', getTodos);
router.delete('/delete-todo', deleteTodo)
router.post('/completed-todo', completedTodo)
router.post('/get-date-todos', getDateTodos)

module.exports = router