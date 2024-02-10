"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql2_1 = __importDefault(require("mysql2"));
const config_js_1 = __importDefault(require("../../config/config.js"));
const user_js_1 = __importDefault(require("./user.js"));
const operation_js_1 = __importDefault(require("./operation.js"));
const env = process.env.NODE_ENV;
const config = config_js_1.default[env];
let sequelize;
sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, { host: config.host, dialect: config.dialect, port: '3306', dialectModule: mysql2_1.default });
let db = {};
db['users'] = (0, user_js_1.default)(sequelize, sequelize_1.DataTypes);
db['operations'] = (0, operation_js_1.default)(sequelize, sequelize_1.DataTypes);
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
//# sourceMappingURL=index.js.map