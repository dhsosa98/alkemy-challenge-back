import { Model } from 'sequelize';
'use strict';

const OperationModel = (sequelize, DataTypes) => {
	class Operation extends Model {

    
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

export default OperationModel;