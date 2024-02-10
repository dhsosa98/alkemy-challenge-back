"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_repository_js_1 = __importDefault(require("./base.repository.js"));
const entity = 'users';
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield base_repository_js_1.default.getAll(entity);
    return users;
});
const get = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield base_repository_js_1.default.get(entity, id);
    return user;
});
const getByField = (toWhere) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield base_repository_js_1.default.getByField(entity, toWhere);
    return user;
});
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userCreated = yield base_repository_js_1.default.create(entity, data);
    return userCreated;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userDeleted = yield base_repository_js_1.default.destroy(entity, id);
    return userDeleted;
});
const updateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userUpdated = yield base_repository_js_1.default.update(entity, data);
    return userUpdated;
});
const userRepository = {
    createUser,
    getAll,
    get,
    getByField,
    deleteUser,
    updateUser
};
exports.default = userRepository;
//# sourceMappingURL=user.repository.js.map