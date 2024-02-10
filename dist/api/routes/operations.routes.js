"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = require("../controllers/index.js");
const verifyToken_js_1 = __importDefault(require("../middlewares/verifyToken.js"));
const operationRouter = express_1.default.Router();
operationRouter.get('/', verifyToken_js_1.default, index_js_1.operationsController.getAll);
operationRouter.get('/userOperations', verifyToken_js_1.default, index_js_1.operationsController.getByUserIDandQueries);
operationRouter.get('/:id', verifyToken_js_1.default, index_js_1.operationsController.get);
operationRouter.post('/', verifyToken_js_1.default, index_js_1.operationsController.createOperation);
operationRouter.delete('/:id', verifyToken_js_1.default, index_js_1.operationsController.deleteOperation);
operationRouter.patch('/', verifyToken_js_1.default, index_js_1.operationsController.updateOperation);
exports.default = operationRouter;
//# sourceMappingURL=operations.routes.js.map