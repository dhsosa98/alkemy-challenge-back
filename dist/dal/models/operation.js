"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
'use strict';
const OperationModel = (sequelize, DataTypes) => {
    class Operation extends sequelize_1.Model {
        static associate(models) {
            Operation.belongsTo(models.users, {
                foreignKey: 'UserId'
            });
        }
    }
    Operation.init({
        concept: DataTypes.STRING,
        category: DataTypes.STRING,
        date: DataTypes.DATE,
        amount: DataTypes.FLOAT,
        type: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'operations',
        timestamps: false
    });
    return Operation;
};
exports.default = OperationModel;
//# sourceMappingURL=operation.js.map