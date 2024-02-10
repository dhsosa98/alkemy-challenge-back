'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const UserModel = (sequelize) => {
    class User extends sequelize_1.Model {
    }
    User.init({
        username: { type: sequelize_1.DataTypes.STRING, unique: true },
        password: sequelize_1.DataTypes.STRING,
        name: sequelize_1.DataTypes.STRING,
        surname: sequelize_1.DataTypes.STRING,
        avatar: sequelize_1.DataTypes.STRING
    }, {
        sequelize,
        modelName: 'users',
        timestamps: false
    });
    return User;
};
exports.default = UserModel;
//# sourceMappingURL=user.js.map