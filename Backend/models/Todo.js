import { DataTypes, Model } from "sequelize";

class Todo extends Model {
    static initModel(sequelize) {
        Todo.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                title: {
                    tpye: DataTypes.STRING,
                    allowNull: false
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull:true
                },
                category: {
                    type: DataTypes.STRING,
                    allowNull:true
                },
                priority: {
                    type: DataTypes.ENUM("low", "medium", "high"),
                    allowNull: true,
                    defaultValue: "medium"
                },
                completed: {
                    type:DataTypes.BOOLEAN,
                    defaultValue: false
                }
            },
            {
                sequelize,
                tableName: 'todos',
                modelName:'Todo',
                timestamps: true
            }
        )
    }
}

export default Todo