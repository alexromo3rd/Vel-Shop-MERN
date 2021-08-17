require('dotenv').config({ path: '../.env' });
import express from 'express';
import mongoose from 'mongoose';
const { register } = require('./controllers/authCtrl');
const { getUser } = require('./controllers/userCtrl');

const { SERVER_PORT, MONGO_URI } = process.env;
const app = express();
app.use(express.json());

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
app.post('/api/auth', register);

// User
app.get('/api/users', getUser);
