import baseRepository from './base.repository.js';

const entity = 'operations';

const getOperations = async () => {
	const operations = await baseRepository.getAll(entity);
	return operations;
};

const createOperation = async (data) => {
	const operationCreated = await baseRepository.create(entity, data);
	return operationCreated;
};

const get = async (id) => {
	const operation = await baseRepository.get(entity, id);
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

const getAllByFieldAndOptions = async (options) => {
	const operations = await baseRepository.getAllByFieldAndOptions(entity, options);
	return operations;
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
	getAllByField,
	getAllByFieldAndOptions
};

export default operationRepository;
