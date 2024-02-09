import { operationRepository } from "../../dal/repositories/index.js";
import { calculateTotal } from "../helpers/calculateTotal.js";
import { createPagination } from "../helpers/pagination.js";
import { createSort } from "../helpers/sort.js";
import { createSearch } from "../helpers/search.js";
import { createFilter } from "../helpers/filter.js";
import { createFilterBy } from "../helpers/filterBy.js";

const getAll = async (req, res) => {
  const operations = await operationRepository.getOperations();
  return res.status(200).send({
    data: operations?.map((operation) => {
      if (!operation["date"]) {
        operation["date"] = "";
      }
      return operation;
    }),
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
  data["UserId"] = req.session.user.id;
  if (!data["date"]) {
    data["date"] = null;
  }
  const operationCreated = await operationRepository.createOperation(data);
  return res.send({
    data: operationCreated,
  });
};

const deleteOperation = async (req, res) => {
  const { id } = req.params;
  const operationDeleted = await operationRepository.deleteOperation(id);
  return res.send({
    data: operationDeleted,
  });
};

const updateOperation = async (req, res) => {
  const data = req.body;
  if (!data["date"]) {
    data["date"] = null;
  }
  const operationUpdated = await operationRepository.updateOperation(data);
  return res.send({
    data: operationUpdated,
  });
};

const getByUserIDandQueries = async (req, res) => {
  const { id } = req.session.user;
  let { page, size, sort, search, from, to, filterBy } = req.query;
  const { limit, offset } = createPagination(page, size);
  const { order } = createSort(sort);
  const { fields } = createFilterBy(filterBy)
  const { filter } = createFilter(search, from, to, fields)
  let toWhere = {...filter}
  const options = { order, limit, offset, where: { UserId: id, ...toWhere } };
  const operations =
    (await operationRepository.getAllByFieldAndOptions(options)) || [];
  const total = await calculateTotal(id);
  operations["total"] = total || 0;
  return res.send({
    data: { operations: operations },
  });
};

const operationsController = {
  getAll,
  createOperation,
  get,
  deleteOperation,
  updateOperation,
  getByUserIDandQueries,
};

export default operationsController;
