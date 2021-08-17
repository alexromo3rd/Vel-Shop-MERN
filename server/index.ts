require('dotenv').config({ path: '../.env' });
import express, { Application } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
const { register, login, logout } = require('./controllers/authCtrl');
const { getUser } = require('./controllers/userCtrl');

const { NODE_ENV, SERVER_PORT, SESSION_SECRET, MONGO_URI } = process.env;
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

mongoose
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
app.post('/api/register', register);
app.post('/api/login', login);
app.delete('/api/logout', logout);

// User
app.get('/api/users', getUser);
