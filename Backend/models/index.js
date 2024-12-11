const User = require('./User')
const Todo = require('./Todo')
const { Sequelize } = require('sequelize')

User.initModel(Sequelize)
Todo.initModel(Sequelize)

User.hasMany(Todo, {foreignKey: 'userId', as: 'todos'})
Todo.belongsTo(User, {foreignKey: 'userId', as:'user'})


module.exports = {Sequelize, User, Todo}