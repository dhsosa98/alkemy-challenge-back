"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const index_js_1 = require("./api/routes/index.js");
dotenv_1.default.config();
const App = (0, express_1.default)();
const sess = {
    name: process.env.SESSION_NAME,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        sameSite: true,
        maxAge: parseInt(process.env.COOKIE_AGE),
    },
};
App.use((0, cors_1.default)())
    .use((0, morgan_1.default)('dev'))
    .use(express_1.default.json())
    .use(express_1.default.urlencoded({ extended: false }))
    .use((0, cookie_parser_1.default)())
    .use((0, express_session_1.default)(sess))
    .use('/api/users', index_js_1.userRouter)
    .use('/api/operations', index_js_1.operationsRouter)
    .use('/api/files', index_js_1.filesRouter);
exports.default = App;
//# sourceMappingURL=app.js.map