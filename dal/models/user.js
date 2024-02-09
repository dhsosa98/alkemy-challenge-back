'use strict';
import { Model, DataTypes } from 'sequelize';

const UserModel = (sequelize) => {
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

export default UserModel;