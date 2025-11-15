import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import helmet from "helmet";
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes';
import divisiRoutes from './routes/divisiRoutes';
import wawancaraRoutes from './routes/wawancaraRoutes';
import penugasanRoutes from './routes/penugasanRoutes';
import { connectDB } from './config/dbconnection';
dotenv.config();

// eslint-disable-next-line ./types/cript-eslint/no-explicit-any
const app: any = express();

// Request size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const allowedOrigins = [
  process.env.FRONTEND_URL || "https://oprec-makomti.vercel.app",
  "http://localhost:3000"
];

// CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

// Security & parsing
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());

// Connect to database on first request (serverless-friendly)
app.use(async (_req: any, _res: any, next: any) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        next(error);
    }
});

// Health check endpoint
app.get('/health', (_req: any, res: any) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API routes
app.use('/auth', userRoutes);
app.use('/divisi', divisiRoutes);
app.use('/wawancara', wawancaraRoutes);
app.use('/penugasan', penugasanRoutes);

// 404 handler
app.use((req: any, res: any) => {
    res.status(404).json({ 
        error: 'Not Found', 
        message: `Route ${req.method} ${req.path} not found`,
        availableRoutes: ['/health', '/auth', '/divisi', '/wawancara', '/penugasan']
    });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export for Vercel
export default app;
