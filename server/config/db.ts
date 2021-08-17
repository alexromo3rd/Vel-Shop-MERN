import mongoose from 'mongoose';
const { NODE_ENV, MONGO_URI } = process.env;

const connectionString =
  NODE_ENV === 'development' ? 'mongodb://localhost:27017/test' : MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
