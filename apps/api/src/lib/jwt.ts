import * as jwt from 'jsonwebtoken';
import type { JWTUserPayload, JWTAdminPayload } from '../types';
import { JWT_SECRET, ADMIN_JWT_SECRET } from '../config/env';

export const generateUserToken = (payload: JWTUserPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '2d' });
};

export const generateAdminToken = (payload: JWTAdminPayload): string => {
  return jwt.sign(payload, ADMIN_JWT_SECRET, { expiresIn: '2d' });
};

export const verifyUserToken = (token: string): JWTUserPayload => {
  return jwt.verify(token, JWT_SECRET) as JWTUserPayload;
};

export const verifyAdminToken = (token: string): JWTAdminPayload => {
  return jwt.verify(token, ADMIN_JWT_SECRET) as JWTAdminPayload;
};
