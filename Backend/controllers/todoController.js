const { Op } = require('sequelize');
const Todo = require('../models/Todo');

const addTodo = async (req, res) => {
    const { title, description, category = "genel", priority = "medium", userId = null, completed = false } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Başlık zorunludur." });
    }

    try {
        const todo = await Todo.create({ title, description, category, priority, userId, completed });
        res.status(201).json({ message: "Todo başarıyla eklendi.", todo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Todo eklenemedi.", details: error.message });
    }
};

const getTodos = async (req, res) => {
    const { userId = null } = req.query;

    try {
        const todos = userId
            ? await Todo.findAll({ where: { userId } })
            : await Todo.findAll(); 

        res.status(200).json({ message: "Todolar getirildi.", todos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Todo'lar getirilemedi.", details: error.message });
    }
};

const deleteTodo = async (req, res) => {
    const { todoId } = req.query;

    if (!todoId) {
        return res.status(400).json({ error: "Todo ID gerekli." });
    }

    try {
        const deleted = await Todo.destroy({ where: { id: todoId } });

        if (!deleted) {
            return res.status(404).json({ error: "Todo bulunamadı." });
        }

        res.status(200).json({ message: "Todo başarıyla silindi." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Todo silinemedi.", details: error.message });
    }
};

const completedTodo = async (req, res) => {
    const { todoId } = req.query;

    if (!todoId) {
        return res.status(400).json({ error: 'TodoId Gerekli' });
    }

    try {
        const todo = await Todo.findByPk(todoId);
        if (!todo) {
            return res.status(404).json({ error: 'Todo Bulunamadı' });
        }

        if (todo.completed) {
             todo.completed = false;
        } else {
            todo.completed = true;
        }

        await todo.save();

        return res.status(200).json({
            message: todo.completed ? 'Todo Başarıyla Tamamlandı' : 'Todo Tamamlanmadı',
            todo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Todo tamamlanamadı.", details: error.message });
    }
};


const getDateTodos = async (req, res) => {
    const { date } = req.query;
  
    if (!date) {
      return res.status(400).json({ message: 'Date parameter is required.' });
    }
  
    try {



        const todos = await Todo.findAll({
            where: {
              createdAt: {
                [Op.gte]: date,
              },
            },
          });  
      return res.status(200).json({ todos });
    } catch (error) {
      console.error('Error fetching todos:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };



module.exports = { getTodos, addTodo, deleteTodo, completedTodo, getDateTodos };
