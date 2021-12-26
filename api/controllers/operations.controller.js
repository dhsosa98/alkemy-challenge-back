const { operationRepository } = require('../../dal/repositories'); 

const getAll = async (req, res) => {
	const operations = await operationRepository.getOperations(); 
	return res.status(200).send({
		data: operations, 
	}); 
};

const get = async (req, res) => {
	const { id } = req.params; 
	const operation = await operationRepository.get(id); 
	return res.send({
		data: operation,
	}); 

};

const createOperation = async (req, res) => {
	const data = req.body; 
	data['UserId'] = req.session.user.id;
	if (!data["date"]){ data["date"] = null}
	const operationCreated = await operationRepository.createOperation(data); 
	return res.send({
		data: operationCreated
	}); 
};

const deleteOperation = async (req, res) => {
	const { id } = req.params; 
	const operationDeleted = await operationRepository.deleteOperation(id); 
	return res.send({
		data: operationDeleted
	});
};

const updateOperation = async (req, res) => {
	const data = req.body; 
	const operationUpdated = await operationRepository.updateOperation(data); 
	return res.send({
		data: operationUpdated
	});
};

const getByUserID = async (req, res) => {
	const { id } = req.session.user; 
	const toWhere = { UserId: id };
	const operations = await operationRepository.getAllByField(toWhere); 
	return res.send({
		data: operations
	});
};

const operationController = {
	getAll, 
	createOperation,
	get,
	deleteOperation,
	updateOperation,
	getByUserID
};

module.exports = operationController; 