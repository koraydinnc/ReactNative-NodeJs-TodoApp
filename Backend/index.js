const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const todoRoutes = require('./routes/todoRoutes');
const Todo = require('./models/Todo');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', todoRoutes);

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL Connected');

        Todo.initModel(sequelize);
        await sequelize.sync({ alter: true });
        console.log('Database synchronized');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
};

connectToDatabase();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
