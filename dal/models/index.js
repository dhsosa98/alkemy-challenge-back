import { Sequelize, DataTypes } from 'sequelize';
import mysql2 from 'mysql2';
import databaseConfig from '../../config/config.js';
import UserModel from './user.js';
import OperationModel from './operation.js';

const env = process.env.NODE_ENV;

const config = databaseConfig[env];

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, {host: config.host, dialect: config.dialect, port: '3306', dialectModule: mysql2});

let db = {};

db['users'] = UserModel(sequelize, DataTypes);
db['operations'] = OperationModel(sequelize, DataTypes);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
