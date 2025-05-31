// server.js
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import { connectDB } from './database/db.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);

// Call connectDB and then start the server
const startServer = async () => {
  await connectDB(); // 👈 Establish DB connection first
  app.listen(8080, () => {
    console.log('Server running on port 8080');
  });
};

startServer(); // 👈 Start the app
