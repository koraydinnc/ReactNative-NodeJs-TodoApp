const express = require('express')
const {addTodo, getTodos, deleteTodo, completedTodo} = require('../controllers/todoController')

const router = express.Router();

router.post('/add-todo', addTodo);
router.get('/get-todo', getTodos);
router.delete('/delete-todo', deleteTodo)
router.post('/completed-todo', completedTodo)

module.exports = router