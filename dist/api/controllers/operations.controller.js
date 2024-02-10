"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../dal/repositories/index.js");
const calculateTotal_js_1 = require("../helpers/calculateTotal.js");
const pagination_js_1 = require("../helpers/pagination.js");
const sort_js_1 = require("../helpers/sort.js");
const search_js_1 = require("../helpers/search.js");
const filter_js_1 = require("../helpers/filter.js");
const filterBy_js_1 = require("../helpers/filterBy.js");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const operations = yield index_js_1.operationRepository.getOperations();
    return res.status(200).send({
        data: operations === null || operations === void 0 ? void 0 : operations.map((operation) => {
            if (!operation["date"]) {
                operation["date"] = "";
            }
            return operation;
        }),
    });
});
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const operation = yield index_js_1.operationRepository.get(id);
    return res.send({
        data: operation,
    });
});
const createOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    data["UserId"] = req.session.user.id;
    if (!data["date"]) {
        data["date"] = null;
    }
    const operationCreated = yield index_js_1.operationRepository.createOperation(data);
    return res.send({
        data: operationCreated,
    });
});
const deleteOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const operationDeleted = yield index_js_1.operationRepository.deleteOperation(id);
    return res.send({
        data: operationDeleted,
    });
});
const updateOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data["date"]) {
        data["date"] = null;
    }
    const operationUpdated = yield index_js_1.operationRepository.updateOperation(data);
    return res.send({
        data: operationUpdated,
    });
});
const getByUserIDandQueries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.session.user;
    let { page, size, sort, search, from, to, filterBy } = req.query;
    const { limit, offset } = (0, pagination_js_1.createPagination)(page, size);
    const { order } = (0, sort_js_1.createSort)(sort);
    const { fields } = (0, filterBy_js_1.createFilterBy)(filterBy);
    const { filter } = (0, filter_js_1.createFilter)(search, from, to, fields);
    let toWhere = Object.assign({}, filter);
    const options = { order, limit, offset, where: Object.assign({ UserId: id }, toWhere) };
    const operations = (yield index_js_1.operationRepository.getAllByFieldAndOptions(options)) || [];
    const total = yield (0, calculateTotal_js_1.calculateTotal)(id);
    operations["total"] = total || 0;
    return res.send({
        data: { operations: operations },
    });
});
const operationsController = {
    getAll,
    createOperation,
    get,
    deleteOperation,
    updateOperation,
    getByUserIDandQueries,
};
exports.default = operationsController;
//# sourceMappingURL=operations.controller.js.map