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
	if (!data["date"]){ data["date"] = null}
	const operationUpdated = await operationRepository.updateOperation(data); 
	return res.send({
		data: operationUpdated
	});
};

const getByUserID = async (req, res) => {
	const { id } = req.session.user; 
	let {page, size} = req.query
	let limit = parseInt(size) || 10
	const offset = parseInt(page)*size || 0
	let toWhere = { UserId: id };
	let options = {where: toWhere}
	if (offset){options = {...options, offset: offset}}
	if (limit){options = {...options, limit: limit}}
	console.log(options)
	const operations = await operationRepository.getAllByFieldAndPagination(options); 
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