import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import authRoutes from './routes/auth';
import aiRoutes from './routes/ai';

// 환경 변수 로드
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // 개발 환경에서는 모든 localhost 허용
    if (!origin || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'CodeMap API Server',
    version: '1.0.0',
    status: 'running'
  });
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Auth routes
app.use('/api/auth', authRoutes);

// AI routes
app.use('/api/ai', aiRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);

  // 데이터베이스 연결 테스트
  await testConnection();
});

export default app;
