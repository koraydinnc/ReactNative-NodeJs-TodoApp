const express = require('express')
const {addTodo, getTodos, deleteTodo, completedTodo, getDateTodos, updateTodo} = require('../controllers/todoController')

const router = express.Router();

router.post('/add-todo', addTodo);
router.get('/get-todo', getTodos);
router.delete('/delete-todo', deleteTodo)
router.post('/completed-todo', completedTodo)
router.post('/get-date-todos', getDateTodos)
router.put('/update-todo/:id', updateTodo)

module.exports = router