import type { Response, NextFunction } from 'express';
import { verifyUserToken, verifyAdminToken } from '../lib/jwt';
import { sendError } from '../utils/response';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors';
import type { AuthenticatedRequest } from '../types';

export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      sendError(
        res,
        ERROR_CODES.UNAUTHORIZED,
        ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED],
        401
      );
      return;
    }

    const token = authHeader.substring(7);
    const decoded = verifyUserToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error in authenticateUser:', error);
    sendError(
      res,
      ERROR_CODES.INVALID_TOKEN,
      ERROR_MESSAGES[ERROR_CODES.INVALID_TOKEN],
      401
    );
  }
};

export const authenticateAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      sendError(
        res,
        ERROR_CODES.UNAUTHORIZED,
        ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED],
        401
      );
      return;
    }

    const token = authHeader.substring(7);
    const decoded = verifyAdminToken(token);
    req.admin = decoded;
    next();
  } catch (error) {
    console.error('Error in authenticateAdmin:', error);
    sendError(
      res,
      ERROR_CODES.INVALID_TOKEN,
      ERROR_MESSAGES[ERROR_CODES.INVALID_TOKEN],
      401
    );
  }
};

export const authenticateUserOrAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      sendError(
        res,
        ERROR_CODES.UNAUTHORIZED,
        ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED],
        401
      );
      return;
    }

    const token = authHeader.substring(7);

    // 先嘗試驗證管理員 token
    try {
      const adminDecoded = verifyAdminToken(token);
      req.admin = adminDecoded;
      next();
      return;
    } catch {
      // 如果管理員 token 驗證失敗，嘗試使用者 token
      try {
        const userDecoded = verifyUserToken(token);
        req.user = userDecoded;
        next();
        return;
      } catch {
        // 兩種 token 都驗證失敗
        sendError(
          res,
          ERROR_CODES.INVALID_TOKEN,
          ERROR_MESSAGES[ERROR_CODES.INVALID_TOKEN],
          401
        );
      }
    }
  } catch {
    sendError(
      res,
      ERROR_CODES.INVALID_TOKEN,
      ERROR_MESSAGES[ERROR_CODES.INVALID_TOKEN],
      401
    );
  }
};
