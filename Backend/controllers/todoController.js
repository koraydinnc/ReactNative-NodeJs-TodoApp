const Todo = require('../models/Todo')


const addTodo = async (req, res) => {
    const { title, description, category = "genel", priority = "medium", userId = null } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Başlık zorunludur." });
    }

    try {
        const todo = await Todo.create({ title, description, category, priority, userId });
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


module.exports = {getTodos, addTodo}