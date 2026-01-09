import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// JWT payload 타입 정의
interface JwtPayload {
  userId: number;
  email: string;
}

// Request에 user 속성 추가
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// JWT 인증 미들웨어
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: '인증 토큰이 필요합니다' });
    }

    // 토큰 검증
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key',
      (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: '유효하지 않은 토큰입니다' });
        }

        req.user = decoded as JwtPayload;
        next();
      }
    );
  } catch (error) {
    console.error('인증 미들웨어 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다' });
  }
};
