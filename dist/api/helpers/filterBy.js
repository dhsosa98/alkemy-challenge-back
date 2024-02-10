"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFilterBy = void 0;
const createFilterBy = (filter) => {
    const fieldArray = (filter === null || filter === void 0 ? void 0 : filter.split(":")) || ["type", "Income"];
    const fields = {
        name: fieldArray[0],
        option: fieldArray[1]
    };
    return { fields };
};
exports.createFilterBy = createFilterBy;
//# sourceMappingURL=filterBy.js.map