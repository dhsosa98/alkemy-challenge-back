"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSort = void 0;
const createSort = (sort) => {
    let order = [];
    sort === null || sort === void 0 ? void 0 : sort.split(",").forEach((element) => {
        order = [...order, [element === null || element === void 0 ? void 0 : element.split(":")[0], element === null || element === void 0 ? void 0 : element.split(":")[1]]];
    });
    return { order };
};
exports.createSort = createSort;
//# sourceMappingURL=sort.js.map