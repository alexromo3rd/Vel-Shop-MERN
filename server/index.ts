require('dotenv').config({ path: '../.env' });
import express from 'express';
import mongoose from 'mongoose';

const { SERVER_PORT, MONGO_URI } = process.env;
const app = express();
app.use(express.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}.`);
});
