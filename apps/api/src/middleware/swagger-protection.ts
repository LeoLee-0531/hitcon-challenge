import { Request, Response, NextFunction } from 'express';
import { authenticateAdmin } from './auth';
import { AuthenticatedRequest } from '../types';

// 環境檢查中間件
export const environmentCheck = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // 生產環境完全禁用 Swagger
  if (process.env.NODE_ENV === 'production') {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: '頁面不存在',
        timestamp: new Date().toISOString(),
      },
    });
    return;
  }
  next();
};

// IP 白名單檢查
export const ipWhitelist = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const allowedIPs = process.env.SWAGGER_ALLOWED_IPS?.split(',') || [
    '127.0.0.1',
    '::1',
  ];
  const clientIP =
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  if (!allowedIPs.includes(clientIP)) {
    res.status(403).json({
      success: false,
      error: {
        code: 'IP_NOT_ALLOWED',
        message: '此 IP 位址無權限存取 API 文件',
        timestamp: new Date().toISOString(),
      },
    });
    return;
  }
  next();
};

// 簡單的密碼保護
export const passwordProtection = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const swaggerPassword = process.env.SWAGGER_PASSWORD;

  if (!swaggerPassword) {
    next(); // 如果沒有設定密碼，則跳過檢查
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Swagger Documentation"');
    res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: '需要認證才能存取 API 文件',
        timestamp: new Date().toISOString(),
      },
    });
    return;
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString(
    'ascii'
  );
  const [username, password] = credentials.split(':');

  if (username !== 'swagger' || password !== swaggerPassword) {
    res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_CREDENTIALS',
        message: '認證失效',
        timestamp: new Date().toISOString(),
      },
    });
    return;
  }

  next();
};

// 管理員認證保護
export const adminProtection = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  authenticateAdmin(req as AuthenticatedRequest, res, next);
};

// 時間限制保護（只在特定時間開放）
export const timeBasedAccess = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const allowedHours =
    process.env.SWAGGER_ALLOWED_HOURS?.split(',').map(Number) || [];

  if (allowedHours.length > 0) {
    const currentHour = new Date().getHours();
    if (!allowedHours.includes(currentHour)) {
      res.status(403).json({
        success: false,
        error: {
          code: 'TIME_NOT_ALLOWED',
          message: '當前時間不允許存取 API 文件',
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }
  }

  next();
};
