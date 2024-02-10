"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSearch = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("sequelize"));
const createSearch = (search) => {
    let toWhere = {};
    if (search) {
        if (!!search.trim()) {
            toWhere = Object.assign(Object.assign({}, toWhere), { [sequelize_1.Op.or]: [
                    { concept: { [sequelize_1.Op.like]: "%" + search.trim() + "%" } },
                    { category: { [sequelize_1.Op.like]: "%" + search.trim() + "%" } },
                ] });
        }
        else {
            search = search.trim() + " ";
            toWhere = Object.assign(Object.assign({}, toWhere), { [sequelize_1.Op.or]: [
                    {
                        [sequelize_1.Op.or]: [
                            { concept: { [sequelize_1.Op.eq]: search.trim() } },
                            { concept: { [sequelize_1.Op.like]: "%" + search + "%" } },
                        ],
                    },
                    {
                        [sequelize_1.Op.or]: [
                            { category: { [sequelize_1.Op.eq]: search.trim() } },
                            { category: { [sequelize_1.Op.like]: "%" + search + "%" } },
                        ],
                    },
                ] });
        }
    }
    console.log(toWhere);
    return { toWhere };
};
exports.createSearch = createSearch;
//# sourceMappingURL=search.js.map