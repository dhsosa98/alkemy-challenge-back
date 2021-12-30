'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Operation extends Model {

    
		static associate(models) {
			Operation.belongsTo(models.User); 
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
		modelName: 'Operation',
		timestamps: false
	});
	return Operation;
};