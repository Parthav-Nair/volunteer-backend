import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import applicantsRoute from './routes/applicants.js';
import adminRoute from './routes/admin.js';

dotenv.config();

connectDB();

const app = express();

// Security Middlewares
app.use(helmet()); 
app.use(cors({ origin: process.env.CLIENT_URL || '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] })); 
app.use(express.json({ limit: '10kb' })); 
app.use(morgan('dev')); 

// Rate limiting 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, // Limit each IP to 100 requests
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

app.use('/api/applicants', applicantsRoute);
app.use('/api/admin', adminRoute);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
