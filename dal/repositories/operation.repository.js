const baseRepository = require('./base.repository'); 

const entity = 'Operation'; 

const getOperations = async () => {
	const operations = await baseRepository.getAll(entity); 
	return operations; 
};

const createOperation = async (data) => {
	const operationCreated = await baseRepository.create(entity, data); 
	return operationCreated; 
};

const get = async (id) => {
	const operation = await baseRepository.get(entity,id); 
	return operation; 
};

const deleteOperation = async (id) => {
	const operationDeleted = await baseRepository.destroy(entity, id); 
	return operationDeleted; 
};

const updateOperation = async (data) => {
	const operationUpdated = await baseRepository.update(entity, data); 
	return operationUpdated; 
};

const getAllByField = async (toWhere) => {
	const operations = await baseRepository.getAllByField(entity, toWhere);
	return operations; 
};

const operationRepository = {
	getOperations, 
	createOperation,
	get,
	deleteOperation,
	updateOperation,
	getAllByField
};

module.exports = operationRepository; 