"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("../models/index.js"));
const getAll = (entity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield index_js_1.default[entity].findAll();
        return result;
    }
    catch (error) {
        console.log(error);
        return;
    }
});
const create = (entity, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entityCreated = yield index_js_1.default[entity].create(data);
        return entityCreated;
    }
    catch (error) {
        console.log(error);
        return;
    }
});
const get = (entity, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield index_js_1.default[entity].findByPk(id);
        return result;
    }
    catch (error) {
        console.log(error);
        return;
    }
});
const destroy = (entity, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entityDeleted = yield index_js_1.default[entity].destroy({ where: { id } });
        return entityDeleted;
    }
    catch (error) {
        console.log(error);
        return;
    }
});
const update = (entity, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = data;
    try {
        const entityUpdated = yield index_js_1.default[entity].update(data, { where: { id: id } });
        return entityUpdated;
    }
    catch (error) {
        console.log(error);
        return;
    }
});
const getByField = (entity, toWhere) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield index_js_1.default[entity].findOne({ where: toWhere });
        return result;
    }
    catch (error) {
        console.log(error);
        return;
    }
});
const getAllByFieldAndOptions = (entity, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield index_js_1.default[entity].findAndCountAll(options);
        return result;
    }
    catch (error) {
        console.log(error);
        return;
    }
});
const getAllByField = (entity, toWhere) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield index_js_1.default[entity].findAll({ where: toWhere });
        return result;
    }
    catch (error) {
        console.log(error);
        return;
    }
});
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
exports.default = baseRepository;
//# sourceMappingURL=base.repository.js.map