const { operationRepository } = require('../../dal/repositories'); 
const { Op } = require("sequelize");
const getTotal = require('../middlewares/getTotal');

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
	let {page, size, sort, search} = req.query
	console.log(sort) 
	let sortOpt = []
	sort?.split('#').forEach((element)=>{
		sortOpt = [...sortOpt, [element?.split("%")[0], element?.split("%")[1]]]
	})
	let limit = parseInt(size) || 10
	const offset = parseInt(page)*size || 0
	let toWhere = { UserId: id };
	let options = {};
	if (search){
		toWhere = {...toWhere, [Op.or]: [ {concept: { [Op.like]: '%'+search+'%'} }, {category: { [Op.like]: '%'+search+'%'} } ]}
	}
	else{
		options = {...options, offset: offset}
	}
	options = {...options, where: toWhere}
	if (sort){options = {...options, order: sortOpt}}
	options = {...options, limit: limit}
	console.log(options)
	const total = await getTotal(id)
	const operations = await operationRepository.getAllByFieldAndPagination(options) || []; 
	operations["total"] = total || 0
	return res.send({
		data: {operations: operations}
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