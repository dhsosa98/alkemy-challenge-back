"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFilter = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("sequelize"));
const createFilter = (search, from, to, fields) => {
    var _a, _b;
    let searchFilter = {};
    if (search) {
        searchFilter = {
            [sequelize_1.Op.or]: [
                { concept: { [sequelize_1.Op.like]: "%" + (search === null || search === void 0 ? void 0 : search.trim()) + "%" } },
                { category: { [sequelize_1.Op.like]: "%" + (search === null || search === void 0 ? void 0 : search.trim()) + "%" } },
            ],
        };
    }
    const filter = Object.assign({ [sequelize_1.Op.and]: [
            from
                ? { date: { [sequelize_1.Op.between]: [from, to || sequelize_2.default.fn("NOW")] } }
                : null,
            fields ? { [(_a = fields === null || fields === void 0 ? void 0 : fields.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()]: { [sequelize_1.Op.eq]: (_b = fields === null || fields === void 0 ? void 0 : fields.option) === null || _b === void 0 ? void 0 : _b.toLowerCase() } } : null,
        ] }, searchFilter);
    return {
        filter,
    };
};
exports.createFilter = createFilter;
//# sourceMappingURL=filter.js.map