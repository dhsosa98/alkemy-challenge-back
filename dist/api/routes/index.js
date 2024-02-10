"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesRouter = exports.operationsRouter = exports.userRouter = void 0;
const user_routes_js_1 = __importDefault(require("./user.routes.js"));
exports.userRouter = user_routes_js_1.default;
const operations_routes_js_1 = __importDefault(require("./operations.routes.js"));
exports.operationsRouter = operations_routes_js_1.default;
const files_routes_js_1 = __importDefault(require("./files.routes.js"));
exports.filesRouter = files_routes_js_1.default;
//# sourceMappingURL=index.js.map