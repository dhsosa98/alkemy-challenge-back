'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
	
	}
	User.init({
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		name: DataTypes.STRING,
		surname: DataTypes.STRING,
	}, {
		sequelize,
		modelName: 'User',
		timestamps: false
	});
	return User;
};