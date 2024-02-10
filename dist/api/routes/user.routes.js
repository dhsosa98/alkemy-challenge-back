"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const verifyToken_js_1 = __importDefault(require("../middlewares/verifyToken.js"));
const index_js_1 = require("../controllers/index.js");
const handleFiles_js_1 = require("../middlewares/handleFiles.js");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
/* GET users listing. */
const router = (0, express_2.Router)();
router.get('/', verifyToken_js_1.default, index_js_1.userController.getAll);
router.post('/login', index_js_1.userController.login);
router.post('/googleAuth', index_js_1.userController.googleAuth);
router.get('/me', verifyToken_js_1.default, index_js_1.userController.getMe);
router.delete('/me', verifyToken_js_1.default, index_js_1.userController.deleteMe);
router.patch('/me', verifyToken_js_1.default, upload.single('avatar'), handleFiles_js_1.handleFiles, index_js_1.userController.updateMe);
router.get('/:id', verifyToken_js_1.default, index_js_1.userController.get);
router.post('/register', index_js_1.userController.createUser);
router.put('/reset-password', index_js_1.userController.resetPassword);
router.delete('/:id', verifyToken_js_1.default, index_js_1.userController.deleteUser);
router.patch('/', verifyToken_js_1.default, index_js_1.userController.updateUser);
const userRouter = router;
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map