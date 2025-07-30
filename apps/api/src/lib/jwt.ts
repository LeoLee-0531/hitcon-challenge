import * as jwt from 'jsonwebtoken';
import type { JWTUserPayload, JWTAdminPayload } from '../types';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set.');
}
const JWT_SECRET = process.env.JWT_SECRET;

if (!process.env.ADMIN_JWT_SECRET) {
  throw new Error('ADMIN_JWT_SECRET environment variable is not set.');
}
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;
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
