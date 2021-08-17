require('dotenv').config({ path: '../.env' });
import express, { Application } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
const { register, login, logout } = require('./controllers/authCtrl');
const { getUser } = require('./controllers/userCtrl');
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

// Auth
app.post('/api/register', register);
app.post('/api/login', login);
app.delete('/api/logout', logout);

// User
app.get('/api/users', getUser);
