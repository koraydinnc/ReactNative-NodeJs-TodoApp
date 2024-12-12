const express = require('express')
const {addTodo, getTodos} = require('../controllers/todoController')

const router = express.Router();

router.post('/add-todo', addTodo);
router.get('/get-todo', getTodos);

module.exports = router