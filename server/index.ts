require('dotenv').config({ path: '../.env' });
import express, { Application } from 'express';
import session from 'express-session';
import connectDB from './config/db.js';
const { register, login, logout } = require('./controllers/authCtrl');
const { updateUser, deleteUser } = require('./controllers/userCtrl');
const {
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./controllers/productCtrl');
const { SERVER_PORT, SESSION_SECRET } = process.env;

connectDB();

const app: Application = express();
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
);

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
