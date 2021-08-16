"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: '../.env' });
const express_1 = __importDefault(require("express"));
const { SERVER_PORT } = process.env;
const app = express_1.default();
app.use(express_1.default.json());
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}.`);
});
//# sourceMappingURL=index.js.map