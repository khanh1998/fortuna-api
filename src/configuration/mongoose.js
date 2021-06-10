import mongoose from 'mongoose';

const { MONGO_URL } = process.env;
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { connection } = mongoose;
console.log({ MONGO_URL });
connection.on('error', () => console.log('Database Connection error'));
connection.on('connected', () => console.log('Database Connnection successfully'));
connection.on('disconnected', () => console.log('Database disconnected'));
connection.on('SIGINT', () => console.log('Connnection terminated'));
