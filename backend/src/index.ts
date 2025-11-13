import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import helmet from "helmet";
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import userRoutes from '@routes/userRoutes';
import divisiRoutes from '@routes/divisiRoutes';
import wawancaraRoutes from '@routes/wawancaraRoutes';
import penugasanRoutes from '@routes/penugasanRoutes';
import { connectDB } from '@config/dbconnection';
dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_COMPLETE_URL,
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
connectDB();

app.use('/auth', userRoutes);
app.use('/divisi', divisiRoutes);
app.use('/wawancara', wawancaraRoutes);
app.use('/penugasan', penugasanRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port P`);
});
