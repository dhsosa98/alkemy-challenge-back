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
exports.calculateTotal = void 0;
const index_js_1 = require("../../dal/repositories/index.js");
function calculateTotal(id) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let total = 0;
        const options = { where: { UserId: id } };
        const operations = (yield index_js_1.operationRepository.getAllByFieldAndOptions(options)) || [];
        (_a = operations === null || operations === void 0 ? void 0 : operations.rows) === null || _a === void 0 ? void 0 : _a.forEach((operation) => operation["type"] === "Income"
            ? (total += parseInt(operation["amount"]))
            : (total -= parseInt(operation["amount"])));
        return total;
    });
}
exports.calculateTotal = calculateTotal;
//# sourceMappingURL=calculateTotal.js.map