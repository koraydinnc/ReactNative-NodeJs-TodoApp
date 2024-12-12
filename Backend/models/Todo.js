const { Model, DataTypes } = require('sequelize');

class Todo extends Model {
    static initModel(sequelize) {
        Todo.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                category: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    defaultValue: 'genel',
                },
                priority: {
                    type: DataTypes.ENUM('low', 'medium', 'high'),
                    allowNull: true,
                    defaultValue: 'medium',
                },
                completed: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'todos',
                modelName: 'Todo',
                timestamps: true, // createdAt ve updatedAt otomatik olarak eklenir
            }
        );
    }
}

module.exports = Todo;
