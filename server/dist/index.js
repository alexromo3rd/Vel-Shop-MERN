"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: '../.env' });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const { register, login, logout } = require('./controllers/authCtrl');
const { getUser } = require('./controllers/userCtrl');
const { NODE_ENV, SERVER_PORT, SESSION_SECRET, MONGO_URI } = process.env;
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_session_1.default({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
}));
if (NODE_ENV === 'development') {
    mongoose_1.default
        .connect('mongodb://localhost:27017/myapp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('Database connected!'))
        .catch((err) => console.log(err));
}
if (NODE_ENV === 'production') {
    mongoose_1.default
        .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('Database connected!'))
        .catch((err) => console.log(err));
}
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}.`);
});
// Auth
app.post('/api/register', register);
app.post('/api/login', login);
app.delete('/api/logout', logout);
// User
app.get('/api/users', getUser);
//# sourceMappingURL=index.js.map