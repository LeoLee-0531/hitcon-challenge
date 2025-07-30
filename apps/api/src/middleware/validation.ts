import type { Request, Response, NextFunction } from 'express';
import type { Schema } from 'joi';
import { sendError } from '../utils/response';
import { ERROR_CODES } from '../constants/errors';

export const validateBody = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) {
      sendError(res, ERROR_CODES.INVALID_PARAMS, error.details[0].message);
      return;
    }
    next();
  };
};

export const validateQuery = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.query);
    if (error) {
      sendError(res, ERROR_CODES.INVALID_PARAMS, error.details[0].message);
      return;
    }
    next();
  };
};
