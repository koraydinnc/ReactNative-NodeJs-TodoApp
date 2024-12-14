const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Todo extends Model {}

Todo.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'medium',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue:false
  }
}, {
  sequelize,
  modelName: 'Todo',
  tableName:'todos'
});

module.exports = Todo;
