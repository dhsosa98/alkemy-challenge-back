"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPagination = void 0;
const createPagination = (page, size) => {
    let limit = parseInt(size) || 10;
    const offset = parseInt(page) * size || 0;
    return { limit, offset };
};
exports.createPagination = createPagination;
//# sourceMappingURL=pagination.js.map