import Joi from 'joi';

export const googleAuthSchema = Joi.object({
  google_token: Joi.string().required(),
});

export const adminLoginSchema = Joi.object({
  password: Joi.string().required(),
});

export const userLanguageSchema = Joi.object({
  language: Joi.string().valid('zh', 'en').required(),
});

export const stageVerifySchema = Joi.object({
  stage_id: Joi.string().required(),
  password: Joi.string().required(),
});

export const rewardClaimSchema = Joi.object({
  user_id: Joi.string().required(),
});

export const rewardStatusQuerySchema = Joi.object({
  user_id: Joi.string().optional(),
});
