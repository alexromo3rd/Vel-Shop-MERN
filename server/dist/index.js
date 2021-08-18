"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: '../.env' });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const db_js_1 = __importDefault(require("./config/db.js"));
const { register, login, logout } = require('./controllers/authCtrl');
const { updateUser, deleteUser } = require('./controllers/userCtrl');
const { getProduct, getAllProducts, createProduct, updateProduct, deleteProduct, } = require('./controllers/productCtrl');
const { SERVER_PORT, SESSION_SECRET } = process.env;
db_js_1.default();
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_session_1.default({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
}));
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}.`);
});
// Auth endpoints
app.post('/api/register', register);
app.post('/api/login', login);
app.delete('/api/logout', logout);
// User endpoints
app.put('/api/users/:id', updateUser);
app.delete('/api/users/:id', deleteUser);
// Product endpoints
app.get('/api/products', getAllProducts);
app.post('/api/products', createProduct);
app.get('/api/products/:id', getProduct);
app.put('/api/products/:id', updateProduct);
app.delete('/api/products/:id', deleteProduct);
//# sourceMappingURL=index.js.map