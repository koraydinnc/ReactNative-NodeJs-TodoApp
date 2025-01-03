const { Op } = require('sequelize');
const Todo = require('../models/Todo');
const { validateTodo } = require('../validators/todoValidator');

const addTodo = async (req, res) => {
    try {
        const todoData = validateTodo(req.body);
        const todo = await Todo.create(todoData);
        
        res.status(201).json({
            success: true,
            message: "Todo başarıyla eklendi.",
            data: todo
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Todo eklenemedi."
        });
    }
};

const getTodos = async (req, res) => {
    try {
        const { userId, status, priority, startDate, endDate } = req.query;
        
        const whereClause = {};
        if (userId) whereClause.userId = userId;
        if (status) whereClause.completed = status === 'completed';
        if (priority) whereClause.priority = priority;
        
        if (startDate && endDate) {
            whereClause.createdAt = {
                [Op.between]: [
                    new Date(startDate).setHours(0, 0, 0, 0),
                    new Date(endDate).setHours(23, 59, 59, 999)
                ]
            };
        }

        const todos = await Todo.findAll({ 
            where: whereClause,
            order: [
                ['priority', 'DESC'],
                ['createdAt', 'DESC']
            ]
        });

        res.status(200).json({
            success: true,
            message: "Todolar başarıyla getirildi.",
            data: todos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Todo'lar getirilemedi.",
            error: error.message
        });
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

        todo.completed = !todo.completed;
        await todo.save();

        return res.status(200).json({
            message: todo.completed ? 'Todo Başarıyla Tamamlandı' : 'Todo Tamamlanmadı',
            todo,
            status: 1,
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
        const startOfDay = new Date(date); 
        startOfDay.setHours(0, 0, 0, 0);
    
        const endOfDay = new Date(date); 
        endOfDay.setHours(23, 59, 59, 999);

        const todos = await Todo.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startOfDay, endOfDay],
                },
            },
        });

      
        const formattedData = {
            [date]: todos.map(todo => ({
                name: todo.title,
                completed: todo.completed,
                priority: todo.priority,
                id: todo.id,
                category: todo.category,
                description: todo.description,
               
            }))
        };

        return res.status(200).json(formattedData);
    } catch (error) {
        console.error('Error fetching todos:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const updates = validateTodo(req.body, true);

        const todo = await Todo.findByPk(todoId);
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo bulunamadı."
            });
        }

        await todo.update(updates);
        
        res.status(200).json({
            success: true,
            message: "Todo başarıyla güncellendi.",
            data: todo
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Todo güncellenemedi."
        });
    }
};

module.exports = { getTodos, addTodo, deleteTodo, completedTodo, getDateTodos, updateTodo };
