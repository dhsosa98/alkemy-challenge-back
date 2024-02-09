import db from '../models/index.js';

const getAll = async (entity) => {
	try {
		const result = await db[entity].findAll();
		return result;
	} catch (error) {
		console.log(error);
		return;
	}
};

const create = async (entity, data) => {
	try {
		const entityCreated = await db[entity].create(data);
		return entityCreated;
	} catch (error) {
		console.log(error);
		return;
	}
};

const get = async (entity, id) => {
	try {
		const result = await db[entity].findByPk(id);
		return result;
	} catch (error) {
		console.log(error);
		return;
	}
};

const destroy = async (entity, id) => {
	try {
		const entityDeleted = await db[entity].destroy({ where: { id } });
		return entityDeleted;
	} catch (error) {
		console.log(error);
		return;
	}
};

const update = async (entity, data) => {
	const { id } = data;
	try {
		const entityUpdated = await db[entity].update(data, { where: { id: id } });
		return entityUpdated;
	} catch (error) {
		console.log(error);
		return;
	}
};

const getByField = async (entity, toWhere) => {
	try {
		const result = await db[entity].findOne({ where: toWhere });
		return result;
	} catch (error) {
		console.log(error);
		return;
	}
};

const getAllByFieldAndOptions = async (entity, options) => {
	try {
		const result = await db[entity].findAndCountAll(options);
		return result;
	} catch (error) {
		console.log(error);
		return;
	}
};

const getAllByField = async (entity, toWhere) => {
	try {
		const result = await db[entity].findAll({ where: toWhere });
		return result;
	} catch (error) {
		console.log(error);
		return;
	}
};

const baseRepository = {
	getAll,
	create,
	get,
	destroy,
	update,
	getByField,
	getAllByField,
	getAllByFieldAndOptions,
};

export default baseRepository;
