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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_repository_js_1 = __importDefault(require("./base.repository.js"));
const entity = 'operations';
const getOperations = () => __awaiter(void 0, void 0, void 0, function* () {
    const operations = yield base_repository_js_1.default.getAll(entity);
    return operations;
});
const createOperation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const operationCreated = yield base_repository_js_1.default.create(entity, data);
    return operationCreated;
});
const get = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const operation = yield base_repository_js_1.default.get(entity, id);
    return operation;
});
const deleteOperation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const operationDeleted = yield base_repository_js_1.default.destroy(entity, id);
    return operationDeleted;
});
const updateOperation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const operationUpdated = yield base_repository_js_1.default.update(entity, data);
    return operationUpdated;
});
const getAllByFieldAndOptions = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const operations = yield base_repository_js_1.default.getAllByFieldAndOptions(entity, options);
    return operations;
});
const getAllByField = (toWhere) => __awaiter(void 0, void 0, void 0, function* () {
    const operations = yield base_repository_js_1.default.getAllByField(entity, toWhere);
    return operations;
});
const operationRepository = {
    getOperations,
    createOperation,
    get,
    deleteOperation,
    updateOperation,
    getAllByField,
    getAllByFieldAndOptions
};
exports.default = operationRepository;
//# sourceMappingURL=operation.repository.js.map