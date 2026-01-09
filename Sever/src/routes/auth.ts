import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const router = Router();

// 회원가입
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('유효한 이메일을 입력하세요'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('비밀번호는 최소 6자 이상이어야 합니다'),
    body('username')
      .isLength({ min: 2 })
      .withMessage('사용자 이름은 최소 2자 이상이어야 합니다')
  ],
  async (req: Request, res: Response) => {
    try {
      // 유효성 검사
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, username } = req.body;

      // 이메일 중복 확인
      const [existingUsers] = await pool.query<RowDataPacket[]>(
        'SELECT user_id FROM users WHERE email = ?',
        [email]
      );

      if (existingUsers.length > 0) {
        return res.status(400).json({ message: '이미 사용 중인 이메일입니다' });
      }

      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(password, 10);

      // 사용자 생성
      const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO users (email, password_hash, username, level, experience_points, total_experience) VALUES (?, ?, ?, 1, 0, 0)',
        [email, hashedPassword, username]
      );

      // JWT 토큰 생성
      const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
      const jwtExpires = process.env.JWT_EXPIRES_IN || '7d';
      const token = jwt.sign(
        { userId: result.insertId, email },
        jwtSecret,
        { expiresIn: jwtExpires } as jwt.SignOptions
      );

      res.status(201).json({
        message: '회원가입이 완료되었습니다',
        token,
        user: {
          userId: result.insertId,
          email,
          username,
          level: 1
        }
      });
    } catch (error) {
      console.error('회원가입 오류:', error);
      console.error('오류 상세:', error instanceof Error ? error.message : String(error));
      console.error('스택:', error instanceof Error ? error.stack : 'No stack trace');
      res.status(500).json({
        message: '서버 오류가 발생했습니다',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }
);

// 로그인
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('유효한 이메일을 입력하세요'),
    body('password').notEmpty().withMessage('비밀번호를 입력하세요')
  ],
  async (req: Request, res: Response) => {
    try {
      // 유효성 검사
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // 사용자 조회
      const [users] = await pool.query<RowDataPacket[]>(
        'SELECT user_id, email, password_hash, username, level, experience_points FROM users WHERE email = ?',
        [email]
      );

      if (users.length === 0) {
        return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다' });
      }

      const user = users[0];
      if (!user) {
        return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다' });
      }

      // 비밀번호 확인
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);

      if (!isPasswordValid) {
        return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다' });
      }

      // JWT 토큰 생성
      const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
      const jwtExpires = process.env.JWT_EXPIRES_IN || '7d';
      const token = jwt.sign(
        { userId: user.user_id, email: user.email },
        jwtSecret,
        { expiresIn: jwtExpires } as jwt.SignOptions
      );

      res.json({
        message: '로그인 성공',
        token,
        user: {
          userId: user.user_id,
          email: user.email,
          username: user.username,
          level: user.level,
          experiencePoints: user.experience_points
        }
      });
    } catch (error) {
      console.error('로그인 오류:', error);
      res.status(500).json({ message: '서버 오류가 발생했습니다' });
    }
  }
);

export default router;
