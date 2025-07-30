import { Request, Response, NextFunction } from 'express';
import { verifyUserToken, verifyAdminToken } from '../lib/jwt';
import { sendError } from '../utils/response';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors';
import { AuthenticatedRequest } from '../types';

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
    sendError(
      res,
      ERROR_CODES.INVALID_TOKEN,
      ERROR_MESSAGES[ERROR_CODES.INVALID_TOKEN],
      401
    );
  }
};
