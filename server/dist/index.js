"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: '../.env' });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const { register } = require('./controllers/authCtrl');
const { getUser } = require('./controllers/userCtrl');
const { SERVER_PORT, MONGO_URI } = process.env;
const app = express_1.default();
app.use(express_1.default.json());
mongoose_1.default
    .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log(err));
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}.`);
});
// Auth
app.post('/api/auth', register);
// User
app.get('/api/users', getUser);
//# sourceMappingURL=index.js.map