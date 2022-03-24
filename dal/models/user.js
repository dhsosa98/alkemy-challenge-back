'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
	
	}
	User.init({
		username: {type: DataTypes.STRING, unique: true},
		password: DataTypes.STRING,
		name: DataTypes.STRING,
		surname: DataTypes.STRING,
		avatar: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'users',
		timestamps: false
	});
	return User;
};