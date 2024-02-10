"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const port = parseInt(process.env.PORT);
app_1.default.listen(port, function () {
    console.log(`Application running on ${port}`);
});
//# sourceMappingURL=index.js.map