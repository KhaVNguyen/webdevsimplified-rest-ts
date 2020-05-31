import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import subscribersRouter from './routes/subscribers';

dotenv.config();
const app = express();

/**
 * Mongo DB Setup
 */
mongoose.connect(<string>process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to the Database'));

/**
 * Middleware
 */
app.use(express.json());

/**
 * Routes
 */
// const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

app.use('/_healthcheck', (_req, res) => {
  res.status(200).json({ uptime: process.uptime() });
});

/**
 * Server Launch
 */

app.listen(3000, () => {
  console.log('Running at localhost:3000');
});
