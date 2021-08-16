require('dotenv').config({ path: '../.env' });
import express from 'express';

const { SERVER_PORT } = process.env;

const app = express();
app.use(express.json());

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}.`);
});
