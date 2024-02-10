"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
function verifyJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.send({ error: 'Not token' });
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.session.user = user;
        next();
    });
}
exports.default = verifyJWT;
//# sourceMappingURL=verifyToken.js.map